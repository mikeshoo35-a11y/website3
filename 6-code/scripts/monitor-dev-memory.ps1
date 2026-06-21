param(
    [int]$DurationMinutes = 12,
    [int]$IntervalSeconds = 20,
    [string]$BaseUrl = "http://localhost:3000",
    [string]$LogFile = "memory-monitor.log"
)

$end = (Get-Date).AddMinutes($DurationMinutes)
$paths = @("/", "/about")

"=== Memory monitor started $(Get-Date -Format o) ===" | Out-File -FilePath $LogFile -Encoding utf8
"duration_min=$DurationMinutes interval_sec=$IntervalSeconds base_url=$BaseUrl" | Out-File -FilePath $LogFile -Append -Encoding utf8
"" | Out-File -FilePath $LogFile -Append -Encoding utf8

while ((Get-Date) -lt $end) {
    $stamp = Get-Date -Format "yyyy-MM-dd HH:mm:ss"
    $os = Get-CimInstance Win32_OperatingSystem
    $freeMb = [math]::Round($os.FreePhysicalMemory / 1024, 1)
    $totalMb = [math]::Round($os.TotalVisibleMemorySize / 1024, 1)
    $usedPct = [math]::Round((1 - ($os.FreePhysicalMemory / $os.TotalVisibleMemorySize)) * 100, 1)

    $nodeProcs = Get-Process node -ErrorAction SilentlyContinue
    $nodeWsMb = 0
    $nodePrivateMb = 0
    $nodeCount = 0
    if ($nodeProcs) {
        $nodeCount = @($nodeProcs).Count
        $nodeWsMb = [math]::Round(($nodeProcs | Measure-Object WorkingSet64 -Sum).Sum / 1MB, 1)
        $nodePrivateMb = [math]::Round(($nodeProcs | Measure-Object PrivateMemorySize64 -Sum).Sum / 1MB, 1)
    }

  $reqParts = @()
    foreach ($path in $paths) {
        $url = "$BaseUrl$path"
        $sw = [System.Diagnostics.Stopwatch]::StartNew()
        try {
            $resp = Invoke-WebRequest -Uri $url -UseBasicParsing -TimeoutSec 15
            $sw.Stop()
            $reqParts += "$path=$($resp.StatusCode)/$([math]::Round($sw.Elapsed.TotalMilliseconds))ms"
        } catch {
            $sw.Stop()
            $reqParts += "$path=ERR/$([math]::Round($sw.Elapsed.TotalMilliseconds))ms"
        }
    }

    $line = "$stamp | sys_free=${freeMb}MB/${totalMb}MB (${usedPct}% used) | node_count=$nodeCount ws=${nodeWsMb}MB private=${nodePrivateMb}MB | $($reqParts -join ' ')"
    $line | Out-File -FilePath $LogFile -Append -Encoding utf8
    Write-Output $line

    Start-Sleep -Seconds $IntervalSeconds
}

"=== Memory monitor finished $(Get-Date -Format o) ===" | Out-File -FilePath $LogFile -Append -Encoding utf8
