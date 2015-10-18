Template.upsertCollaborationForm.onCreated(function () {

});
Template.upsertCollaborationForm.onRendered(function () {

});
Template.upsertCollaborationForm.onDestroyed(function () {

});


Template.upsertCollaborationForm.helpers({


});

Template.upsertCollaborationForm.events({
  'click .removeCollaboration': function () {
    //alert(this._id);
    Collaborations.remove({
      _id: this._id
    }, function (error, result) {
      Router.go('/grid/collaborations');
    });
  },
  'click .cancelAndGoCollaborationList': function () {
    Router.go('/grid/collaborations');
  },
  "click #upsertCollaborationButton": function (event, template) {
    event.preventDefault();

    // console.log('click #upsertCollaborationButton');

    // the is(":checked") is producing results opposite of what's expected
    // may be worth investigating whether there's a logic inversion hidden somewhere
    var newCollaboration = {
      isUnlisted: invertValue($('input[name="isUnlisted"]').is(":checked")),
      name: $('input[name="name"]').val(),
      description: $('input[name="description"]').val(),
      collaborators: Collaboration.parse($('input[name="collaborators"]').val()),
      administrators: Collaboration.parse($('input[name="administrators"]').val()),
      invitations: Collaboration.parse($('input[name="invitations"]').val()),
      requests: [],
      requiresAdministratorApprovalToJoin: invertValue($(
        'input[name="requiresAdministratorApprovalToJoin"]').is(":checked"))
    };


    // send the record to the server to be saved
    Meteor.call('collaboration/create', newCollaboration, function (error, result) {
      if (error) {
        console.log('collaboration/create[error]');
        console.log(error);
      }
      if (result) {
        console.log('collaboration/create[result]', result);
        Router.go('/grid/collaborations');
      }
    });
  }
});


invertValue = function (value) {
  return !value;
};
