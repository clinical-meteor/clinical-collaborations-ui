


Template.collaborationActionButtons.helpers({

});

Template.collaborationActionButtons.events({
  'click #saveCollaborationButton': function (){
    $('#upsertCollaborationButton').click();
  },
  'click #addCollaborationButton': function (){
    Router.go('/new/collaboration');
  },
  'click #collaborationsButton': function (){
    Router.go('/grid/collaborations');
  }
});
