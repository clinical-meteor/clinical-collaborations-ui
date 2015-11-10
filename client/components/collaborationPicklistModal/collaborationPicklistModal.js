Meteor.startup(function () {
  Session.setDefault('showCollaborationPicklist', false);
  Session.setDefault('collaborationModalSearchFilter', "");
  Session.setDefault('selectedCollaborationId', null);
});


Template.collaborationPicklistModal.events({
  'click #collaborationPicklistCancelButton': function (){
    Session.set('showCollaborationPicklist', false);
    Session.set('showReactiveOverlay', false);
  },
  'change #collaborationModalSearchInput': function (){
    Session.set('collaborationModalSearchFilter', $('#collaborationModalSearchInput').val());
  },
  'keyup #collaborationSearchInput': function (){
    Session.set('collaborationSearchFilter', $('#collaborationSearchInput').val());
  },
  "click #collaborationPicklistOkButton": function (event, template) {
    Session.set('showCollaborationPicklist', false);
    Session.set('showReactiveOverlay', false);
  },
  'click .collaborationRow': function (){
    Session.set("selectedCollaborationId", this._id);
    Session.set("collaborationSearchFilter", this.name);
    Session.set('showCollaborationPicklist', false);
    Session.set('showReactiveOverlay', false);

    $('input[name="collaborationId"]').val(this._id);
    $('input[name="collaborationName"]').val(this.name);
  }
});


Template.collaborationPicklistModal.helpers({
  getCurrentSearchFilter: function (){
    return Session.get('collaborationModalSearchFilter');
  },
  collaborationsList: function () {
    return Collaborations.find({$or:[
      {
        _id: {
          $regex: Session.get('collaborationSearchFilter'),
          $options: 'i'
        }
      },
      {
        'name': {
          $regex: Session.get('collaborationSearchFilter'),
          $options: 'i'
        }
      }
    ]});
  },
  getVisibility: function () {
    if (Session.get('showCollaborationPicklist')) {
      return "visible";
    } else {
      return "fade";
    }
  }
});
