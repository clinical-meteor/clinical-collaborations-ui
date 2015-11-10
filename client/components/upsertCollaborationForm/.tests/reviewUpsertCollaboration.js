// // collaboration
// var newCollaboration = {
//   collaborationName: "California Kids Cancer Comparison",
//   description: "Lorem ispum...",
//   slug: "CKCC",
//   administrators: [emailA],
//   collaborators: [emailA, emailB],
//   isUnlisted: false,
//   requiresAdmin: false
// };



exports.command = function (newCollaboration) {
  this
    .sectionBreak(".reviewUpsertCollaboration()");

  this.verify.elementPresent('#upsertCollaborationForm')
    .verify.elementPresent('#addCollaborationForm')

  this
    // .verify.elementPresent("#addCollaborationForm input[name='slug']")
    .verify.elementPresent("#addCollaborationForm input[name='isUnlisted']")
    .verify.elementPresent("#addCollaborationForm input[name='name']")
    .verify.elementPresent("#addCollaborationForm input[name='description']")
    .verify.elementPresent("#addCollaborationForm input[name='collaborators']")
    .verify.elementPresent("#addCollaborationForm input[name='administrators']")
    .verify.elementPresent("#addCollaborationForm input[name='invitations']")
    .verify.elementPresent("#addCollaborationForm input[name='requests']")
    .verify.elementPresent("#addCollaborationForm input[name='requiresAdministratorApprovalToJoin']");

  if (newCollaboration) {

    // if (newCollaboration.slug) {
    //   this
    //     .verify.elementPresent("#addCollaborationForm input[name='slug']")
    //     .verify.attributeEquals("#addCollaborationForm input[name='slug']", newCollaboration.slug);
    // }
    if (newCollaboration.isUnlisted) {
      this
        .verify.elementPresent("#addCollaborationForm input[name='isUnlisted']")
        .verify.attributeEquals("#addCollaborationForm input[name='isUnlisted']", "value", newCollaboration.isUnlisted);
    }
    if (newCollaboration.name) {
      this
        .verify.elementPresent("#addCollaborationForm input[name='name']")
        .verify.attributeEquals("#addCollaborationForm input[name='name']", "value", newCollaboration.name);
    }
    if (newCollaboration.description) {
      this
        .verify.elementPresent("#addCollaborationForm input[name='description']")
        .verify.attributeEquals("#addCollaborationForm input[name='description']", "value", newCollaboration.description);
    }
    // if (newCollaboration.collaborators) {
    //   this
    //     .verify.elementPresent("#addCollaborationForm input[name='collaborators']")
    //     .verify.attributeEquals("#addCollaborationForm input[name='collaborators']", "value", newCollaboration.collaborators);
    // }
    // if (newCollaboration.administrators) {
    //   this
    //     .verify.elementPresent("#addCollaborationForm input[name='administrators']")
    //     .verify.attributeEquals("#addCollaborationForm input[name='administrators']", "value", newCollaboration.administrators);
    // }
    if (newCollaboration.invitations) {
      this
        .verify.elementPresent("#addCollaborationForm input[name='invitations']")
        .verify.attributeEquals("#addCollaborationForm input[name='invitations']", "value", newCollaboration.invitations);
    }
    if (newCollaboration.requests) {
      this
        .verify.elementPresent("#addCollaborationForm input[name='requests']")
        .verify.attributeEquals("#addCollaborationForm input[name='requests']", "value", newCollaboration.requests);
    }
    if (newCollaboration.requiresAdministratorApprovalToJoin) {
      this
        .verify.elementPresent("#addCollaborationForm input[name='requiresAdministratorApprovalToJoin']")
        .verify.attributeEquals("#addCollaborationForm input[name='requiresAdministratorApprovalToJoin']", newCollaboration.requiresAdministratorApprovalToJoin);
    }

  }


  return this;
};
