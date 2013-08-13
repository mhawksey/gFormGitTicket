/*   
   Copyright 2013 Martin Hawksey

   Licensed under the Apache License, Version 2.0 (the "License");
   you may not use this file except in compliance with the License.
   You may obtain a copy of the License at

       http://www.apache.org/licenses/LICENSE-2.0

   Unless required by applicable law or agreed to in writing, software
   distributed under the License is distributed on an "AS IS" BASIS,
   WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   See the License for the specific language governing permissions and
   limitations under the License.
*/

function onFormSubmit(e) {
  // Start by making sure you've File > Make a copy of the template https://docs.google.com/spreadsheet/ccc?key=0AqGkLMU9sHmLdDBueUIxMDRGT2FzaXFLT1hmdXVlTUE
  // To get access_token visit https://github.com/settings/applications and 'Create a new Personal Access Token'
  // To store this token open File > Project properties and then in the Project properties tab 'Add row' with key 'github_access_token' 
  // and the generated token as the value. Do similar to add the repo owner and repo slug.
  // Finally from the Resources > Current project triggers add a on form submit (doing this will also trigger Google authtication)
  var token = ScriptProperties.getProperty("github_access_token");
  var owner = ScriptProperties.getProperty("github_owner");
  var repo = ScriptProperties.getProperty("github_repo");
  
  // are base url - read more in http://developer.github.com/v3/issues/#create-an-issue
  var url = 'https://api.github.com/repos/'+owner+'/'+repo+'/issues';
  
  // making a payload
  var payload = {};
  
  // e.namedValues is returned on a apps script onFormSubmit event 
  // https://developers.google.com/apps-script/understanding_events
  payload.title = e.namedValues['Title of issue/feedback'][0];
  payload.body = e.namedValues['Description of issue/feedback'][0];
  payload.labels = e.namedValues['Label'];
  // if we want we could push more labels eg payload.labels.push('Form Entry');

  try {
    var requestData = {method: "post",
                       headers: { "Authorization": "Bearer " + token},
                       payload: JSON.stringify(payload)};
    // post request to Github
    var result = UrlFetchApp.fetch(url, requestData);
    if (result.getResponseCode() == 201){ // success
      // next bit to write issue url in sheet
      var resp = JSON.parse(result.getContentText());
      var range = e.range;
      var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
      sheet.getRange(range.getLastRow(), range.getLastColumn()+1).setValue(resp.html_url)
    }
  } catch(e){
    // if something went wrong lets try and log
    var doc = SpreadsheetApp.getActiveSpreadsheet();
    var sheet = doc.getSheetByName('Log');
    sheet.insertRowAfter(1);
    var row = [new Date(),e.message];
    sheet.getRange(2, 1, 1, 2).setValues([row]);
  }
}
