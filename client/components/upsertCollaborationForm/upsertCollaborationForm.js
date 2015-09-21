


Template.upsertCollaborationForm.onCreated( function (){

});
Template.upsertCollaborationForm.onRendered( function (){

});
Template.upsertCollaborationForm.onDestroyed( function (){

});


Template.upsertCollaborationForm.helpers({

});

Template.upsertCollaborationForm.events({
  "click #upsertCollaborationButton": function (event, template){
    console.log('click #upsertCollaborationButton');

    var newCollaboration = {
      // name: $('input[name="url"]').val()
      isUnlisted: $('input[name="isUnlisted"]').is(":checked"),
      name: $('input[name="name"]').val(),
      collaborators: [],
      invitations: [],
      requests: [],
      administrators: [],
      requiresAdministratorApprovalToJoin: $('input[name="requiresAdministratorApprovalToJoin"]').is(":checked")
    };

    newCollaboration.collaborators.push($('input[name="collaborators"]').val());
    newCollaboration.invitations.push($('input[name="invitations"]').val());
    newCollaboration.requests.push($('input[name="requests"]').val());
    newCollaboration.administrators.push($('input[name="administrators"]').val());

    console.log('newCollaboration', newCollaboration);

    Collaboration.create(newCollaboration, function (error, result){
      if (result){
        Router.go('/grid/collaborations');
      }
      if (error) {
        console.log('error creating new collaboration', error);
      }
    });
  }
});
