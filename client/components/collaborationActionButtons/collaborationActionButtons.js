




Template.collaborationActionButtons.events({
  'click #addCollaborationButton': function (){
    Router.go('/new/collaboration');
  },
  // 'click #collaborationsButton': function (){
  //   Router.go('/grid/collaborations');
  // }
  'click #saveCollaborationButton': function (){
    $('#upsertCollaborationButton').click();
  }
});
Template.upsertCollaborationActionButtons.events({
  'click #saveCollaborationButton': function (){
    $('#upsertCollaborationButton').click();
  }
});
