param(
    [int]$DurationMinutes = 5,
    [string]$BaseUrl = "http://localhost:3000",
    [string]$LogFile = "load-test.log"
)

$end = (Get-Date).AddMinutes($DurationMinutes)
$paths = @("/", "/about")
$i = 0

"=== Load test started $(Get-Date -Format o) ===" | Out-File -FilePath $LogFile -Encoding utf8

while ((Get-Date) -lt $end) {
    foreach ($path in $paths) {
        try {
            Invoke-WebRequest -Uri "$BaseUrl$path" -UseBasicParsing -TimeoutSec 30 | Out-Null
        } catch {
            "$(Get-Date -Format o) ERR $path $($_.Exception.Message)" | Out-File -FilePath $LogFile -Append -Encoding utf8
        }
    }

    $i++
    if ($i % 20 -eq 0) {
        $nodeProcs = Get-Process node -ErrorAction SilentlyContinue
        $ws = [math]::Round(($nodeProcs | Measure-Object WorkingSet64 -Sum).Sum / 1MB, 1)
        $line = "$(Get-Date -Format 'HH:mm:ss') requests=$i node_ws=${ws}MB"
        $line | Out-File -FilePath $LogFile -Append -Encoding utf8
        Write-Output $line
    }

    Start-Sleep -Milliseconds 500
}

"=== Load test finished $(Get-Date -Format o) requests=$i ===" | Out-File -FilePath $LogFile -Append -Encoding utf8
