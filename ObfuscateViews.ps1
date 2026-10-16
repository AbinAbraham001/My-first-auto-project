# Define the base directory path
$baseDir = "C:/inetpub/wwwroot/ClientPortalCloud/Views"

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

# Update Instruction Folder
# Call the function for Created.cshtml
Update-FileContent -filePath "$baseDir/Instruction/Created.cshtml" `
                   -searchString '<span hidden="hidden">@Html.KnockoutComboBox(m => m.User, userSettings)</span>' `
                   -replacementText '@Html.KnockoutComboBox(m => m.User, userSettings)'

# Call the function for InstructionFileHistoryResults.cshtml
Update-FileContent -filePath "$baseDir/Instruction/InstructionFileHistoryResults.cshtml" `
                   -searchString '<td class="tal" data-bind="text: instructionFile.importedBy"></td>' `
                   -replacementText '@*<td class="tal" data-bind="text: instructionFile.importedBy"></td>*@
                                 <td class="tal">Shown in live</td>' 

# Call the function for Results.cshtml
Update-FileContent -filePath "$baseDir/Instruction/Results.cshtml" `
                   -searchString '<td class="tal" data-bind="text: createdByUserName"></td>' `
                   -replacementText '@*<td class="tal" data-bind="text: createdByUserName"></td>*@ 
                                 <td class="tal">Shown in live</td>'

Update-FileContent -filePath "$baseDir/Instruction/Results.cshtml" `
                   -searchString '<td class="tal" data-bind="text: updatedByUserName"></td>' `
                   -replacementText '@*<td class="tal" data-bind="text: updatedByUserName"></td>*@ 
                                    <td class="tal">Shown in live</td>'     

# Update Request Folder
# Call the function for Approved.cshtml
Update-FileContent -filePath "$baseDir/Request/Approved.cshtml" `
                   -searchString '@Html.KnockoutComboBox(m => m.ApprovedUser, userSettings)' `
                   -replacementText '<span hidden="hidden">@Html.KnockoutComboBox(m => m.ApprovedUser, userSettings)</span>'

# Call the function for Created.cshtml
Update-FileContent -filePath "$baseDir/Request/Created.cshtml" `
                   -searchString '@Html.KnockoutComboBox(m => m.User, userSettings)' `
                   -replacementText '<span hidden="hidden">@Html.KnockoutComboBox(m => m.User, userSettings)</span>'

Update-FileContent -filePath "$baseDir/Request/Created.cshtml" `
                   -searchString '//id = @id,' `
                   -replacementText '//id = @id,@Html.KnockoutComboBox'

# Call the function for HistoricalResults.cshtml
Update-FileContent -filePath "$baseDir/Request/HistoricalResults.cshtml" `
                   -searchString '<td class="tal" data-bind="text: createdByUserName"></td>' `
                   -replacementText '@*<td class="tal" data-bind="text: createdByUserName"></td>*@ 
                                     <td class="tal">Shown in live</td>'

Update-FileContent -filePath "$baseDir/Request/HistoricalResults.cshtml" `
                   -searchString '<td class="tal" data-bind="text: approvedByUserName"></td>' `
                   -replacementText '@*<td class="tal" data-bind="text: approvedByUserName"></td>*@ 
                                      <td class="tal">Shown in live</td>'

# Call the function for QueuedResults.cshtml
Update-FileContent -filePath "$baseDir/Request/QueuedResults.cshtml" `
                   -searchString '<td class="tal" data-bind="text: createdByUserName"></td>' `
                   -replacementText '@*<td class="tal" data-bind="text: createdByUserName"></td>*@
                            <td class="tal">Shown in live</td>'

Update-FileContent -filePath "$baseDir/Request/QueuedResults.cshtml" `
                   -searchString '<td class="tal" data-bind="text: approvedByUserName"></td>' `
                   -replacementText '@*<td class="tal" data-bind="text: approvedByUserName"></td>*@
                            <td class="tal">Shown in live</td>'

# Call the function for Results.cshtml
Update-FileContent -filePath "$baseDir/Request/Results.cshtml" `
                   -searchString '<td class="tal" data-bind="text: createdByUserName"></td>' `
                   -replacementText '@*<td class="tal" data-bind="text: createdByUserName"></td>*@
                                <td class="tal">Shown in live</td>'

Update-FileContent -filePath "$baseDir/Request/Results.cshtml" `
                   -searchString '<td class="tal" data-bind="text: updatedByUserName"></td>' `
                   -replacementText '@*<td class="tal" data-bind="text: updatedByUserName"></td>*@ 
                                <td class="tal">Shown in live</td>'                            

# Update UserManagement Folder
# Call the function for Edit.cshtml
Update-FileContent -filePath "$baseDir/UserManagement/Edit.cshtml" `
                   -searchString '<label tabindex="1">@Model.Email</label>' `
                   -replacementText '@*<label tabindex="1">@Model.Email</label>*@
                            <label tabindex="1">Shown in live</label>'

# Call the function for Search.cshtml
Update-FileContent -filePath "$baseDir/UserManagement/Search.cshtml" `
                   -searchString '<td class="tal" data-bind="text: email"></td>' `
                   -replacementText '@*<td class="tal" data-bind="text: email"></td>*@ 
                                 <td class="tal">Shown in live</td>'