Google Apps Script snippet for using Google Forms for annonymous issue ticket creation

To test what this does fill in this form http://goo.gl/Bv37N6 (uses pre-filled url) and see the result https://github.com/mhawksey/gFormGitTicket/issues

To setup/use on your own repo

1. Start by making sure you've File > Make a copy of the template https://docs.google.com/spreadsheet/ccc?key=0AqGkLMU9sHmLdDBueUIxMDRGT2FzaXFLT1hmdXVlTUE

2. In the new Spreadsheet open Tools > Script editor
  
3. To get access_token visit https://github.com/settings/applications and 'Create a new Personal Access Token'

4. To store this token in the Script editor open File > Project properties and then in the Project properties tab 'Add row' with key 'github_access_token' and the generated token as the value. Do similar to add the repo owner and repo slug.

5. Finally from the Resources > Current project triggers add a on form submit (doing this will also trigger Google authtication)

You can add/edit form fields as required