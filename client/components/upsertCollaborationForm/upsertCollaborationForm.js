


Template.upsertCollaborationForm.onCreated( function (){

});
Template.upsertCollaborationForm.onRendered( function (){

});
Template.upsertCollaborationForm.onDestroyed( function (){

});


Template.upsertCollaborationForm.helpers({
  getDoc: function(){
    return this;
  }
});

Template.upsertCollaborationForm.events({
  "click #upsertCollaborationButton": function (event, template){
    event.preventDefault();

    // console.log('click #upsertCollaborationButton');

    var newCollaboration = {
      isUnlisted: $('input[name="isUnlisted"]').is(":checked"),
      name: $('input[name="name"]').val(),
      collaborators: Collaboration.parse($('input[name="collaborators"]').val()),
      administrators: Collaboration.parse($('input[name="administrators"]').val()),
      invitations: Collaboration.parse($('input[name="invitations"]').val()),
      requests: [],
      //requests: Collaboration.parse($('input[name="requests"]').val()),
      requiresAdministratorApprovalToJoin: $('input[name="requiresAdministratorApprovalToJoin"]').is(":checked")
    };

    // newCollaboration.collaborators.push($('input[name="collaborators"]').val());
    // newCollaboration.invitations.push($('input[name="invitations"]').val());
    // newCollaboration.requests.push($('input[name="requests"]').val());
    // newCollaboration.administrators.push($('input[name="administrators"]').val());

    //Collaborations.create(newCollaboration);

    // console.log('newCollaboration', newCollaboration);

    // send the record to the server to be saved
    Meteor.call('collaboration/create', newCollaboration, function (error, result) {
      if (error) {
        console.log('collaboration/create[error]');
        console.log(error);
      }
      if (result){
        console.log('collaboration/create[result]', result);
        Router.go('/grid/collaborations');
      }
    });



  }
});
