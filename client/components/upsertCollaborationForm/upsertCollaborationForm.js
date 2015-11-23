

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
      name: $('input[name="name"]').val(),
      description: $('input[name="description"]').val(),
      collaborators: Collaboration.parse($('input[name="collaborators"]').val()),
      administrators: Collaboration.parse($('input[name="administrators"]').val()),
      invitations: Collaboration.parse($('input[name="invitations"]').val()),
      requests: [],
      isUnlisted: parseRadioInputs('isUnlisted'),
      requiresAdministratorApprovalToJoin: parseRadioInputs('requiresAdministratorApprovalToJoin')
      // isUnlisted: invertValue($('input[name="isUnlisted"]').is(":checked")),
      // requiresAdministratorApprovalToJoin: invertValue($('input[name="requiresAdministratorApprovalToJoin"]').is(":checked"))
    };

    console.log('currentRecord', this);
    console.log('newCollaboration', newCollaboration);


    if (this._id) {
      // send the record to the server to be saved
      newCollaboration._id = this._id;
      Meteor.call('collaboration/update', newCollaboration, function (error, result) {
        if (error) {
          Session.set('errorMessage', "collaboration/update[error]: " + error);
        }
        if (result) {
          console.log('collaboration/update[result]', result);
          Router.go('/grid/collaborations');
        }
      });
    } else {
      // send the record to the server to be saved
      Meteor.call('collaboration/create', newCollaboration, function (error, result) {
        if (error) {
          Session.set('errorMessage', "collaboration/create[error]: " + error);
          // console.log('collaboration/create[error]');
          // console.log(error);
        }
        if (result) {
          // console.log('collaboration/create[result]', result);
          Router.go('/grid/collaborations');
        }
      });
    }



  }
});


parseRadioInputs = function (name) {
  if ($('input[name="' + name + '"][value="true"]').is(":checked")) {
    return true;
  } else if ($('input[name="' + name + '"][value="false"]').is(":checked")) {
    return false;
  } else {
    return null;
  }
};
