# Define the base directory path
#$baseDir = "C:/inetpub/wwwroot/ClientPortalCloud"
param (
        [string]$baseDir
)

function Update-FileContent {
    param (
        [string]$filePath,
        [string]$searchString,
        [string]$replacementText
    )

    Write-Host "Updating file: $filePath"
    Write-Host "Search string: $searchString"   
    Write-Host "Replacement text: $replacementText"
    Write-Host "-----------------------------------"

    # Read the content of the file
    $fileContent = Get-Content -Path $filePath -Raw

    # Replace the search string with the replacement text
    $updatedContent = $fileContent -replace [regex]::Escape($searchString), $replacementText

    # Write the updated content back to the file
    Set-Content -Path $filePath -Value $updatedContent

    Write-Host "File updated successfully."
}

# Update Web config file
# Call the function for web config
Update-FileContent -filePath "$baseDir/web.config" `
                   -searchString '</handlers>' `
                   -replacementText '</handlers>
    <rewrite>
        <rules>
           <rule name="Remove MigratedRule" stopProcessing="true">
             <match url=".*" />
               <conditions trackAllCaptures="false">
                    <add input="{QUERY_STRING}" pattern="^(.*)(Migrated_)([0-9a-zA-Z]+)$" />
                </conditions>
                <action type="Redirect" url="https://newtraining.allpay.net/ClientPortal/UserManagement/Edit?userName={C:3}" appendQueryString="false" />
           </rule>
        </rules>
    </rewrite>'
