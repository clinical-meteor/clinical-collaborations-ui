Template.collaborationReview.events({
  'click .cancelAndGoCollaborationList': function (){
    Router.go('/grid/collaborations');
  },
  'click .reviewCollaboration': function (event, tmpl) {
    console.log('reviewCollaboration');

    $('.approved:checked').each(function () {
      var col = tmpl.data;
      Collaborations.update({
        _id: col._id
      }, {
        $addToSet: {
          collaborators: this.name
        },
        $pull: {
          requests: this.name
        }
      });
    });

    $('.notApproved:checked').each(function () {
      var col = tmpl.data;
      Collaborations.update({
        _id: col._id
      }, {
        $pull: {
          requests: this.name
        }
      });
    });

    Router.go('/grid/collaborations');
  }
});
