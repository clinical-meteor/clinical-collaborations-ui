
exports.command = function (newCollaboration) {

  console.log('-------------------------------------------');
  console.log('newCollaboration', newCollaboration);

  this.verify.elementPresent('#upsertCollaborationForm')
    .verify.elementPresent('#addCollaborationForm');

  if (newCollaboration.collaborationName) {
    this
      .verify.elementPresent("#addCollaborationForm input[name='name']")
      .clearValue("#addCollaborationForm input[name='name']")
      .setValue("#addCollaborationForm input[name='name']", newCollaboration.collaborationName);
  }
  if (newCollaboration.description) {
    this
      .verify.elementPresent("#addCollaborationForm input[name='description']")
      .clearValue("#addCollaborationForm input[name='description']")
      .setValue("#addCollaborationForm input[name='description']", newCollaboration.description);
  }
  if (newCollaboration.collaborators) {
    var collaboratorsString = "";
    for (var i = 0; i < newCollaboration.collaborators.length; i++) {
      collaboratorsString = collaboratorsString + newCollaboration.collaborators[i].toString();
      if (i < (newCollaboration.collaborators.length - 1)){
        collaboratorsString = collaboratorsString + ",";
      }
    }

    // newCollaboration.collaborators.forEach(function (collaborator, index){
    //   collaboratorsString = collaboratorsString + collaborator.toString();
    //   if (index < (newCollaboration.collaborators.length - 1)) {
    //     collaboratorsString = collaboratorsString + ", ";
    //   }
    // });

    this
      .verify.elementPresent("#addCollaborationForm input[name='collaborators']")
      .clearValue("#addCollaborationForm input[name='collaborators']")
      .setValue("#addCollaborationForm input[name='collaborators']", collaboratorsString);
  }
  if (newCollaboration.administrators) {
    var administratorsString = "";
    for (var i = 0; i < newCollaboration.administrators.length; i++) {
      administratorsString = administratorsString + newCollaboration.administrators[i].toString();
      if (i < (newCollaboration.administrators.length - 1)){
        administratorsString = administratorsString + ",";
      }
    }

    // newCollaboration.administrators.forEach(function (administrator, index){
    //   administratorsString = administratorsString + administrator.toString() + ",";
    //   if (index < (newCollaboration.administrators.length - 1)) {
    //     administratorsString = administratorsString + ",";
    //   }
    // });
    this
      .verify.elementPresent("#addCollaborationForm input[name='administrators']")
      .clearValue("#addCollaborationForm input[name='administrators']")
      .setValue("#addCollaborationForm input[name='administrators']", administratorsString);
  }


  if (newCollaboration.requiresAdmin === false) {
    console.log("newCollaboration.requiresAdmin === false");
    this.click('#addCollaborationForm input[name="requiresAdministratorApprovalToJoin"][value="false"]');
  }
  if (newCollaboration.requiresAdmin === true) {
    console.log("newCollaboration.requiresAdmin === true");
    this.click('#addCollaborationForm input[name="requiresAdministratorApprovalToJoin"][value="true"]');
  }





  if (newCollaboration.isUnlisted === false) {
    this.click('#addCollaborationForm input[name="isUnlisted"][value="false"]');
  }
  if (newCollaboration.isUnlisted === true) {
    this.click('#addCollaborationForm input[name="isUnlisted"][value="true"]');
  }


  this.verify.elementPresent('#upsertCollaborationButton')
    .click("#saveCollaborationButton").pause(500);
    // .click("#upsertCollaborationButton").pause(500);

  return this;
};
