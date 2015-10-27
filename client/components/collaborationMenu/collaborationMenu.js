Template.collaborationMenu.helpers({
  hasCollaboration: function(){
    return typeof Collaboration !== 'undefined' && Collaborations.find().count();
  },
  collaboration: function(){
    return Collaborations.find({}, {sort: {name: 1}});
  },
  collaborationLink: function () {
    return getCollaborationUrl(this.name);
  }
});
