
Template.collaborationReview.events(  {
    'click .cancelAndGoCollaborationList': goCollaborationlist ,

    'click .reviewCollaboration': function(event, tmpl) {

        $('.approved:checked').each(function() {
              var col = tmpl.data;
              Collaborations.update({_id: col._id},
                  {
                    $addToSet: {collaborators: this.name},
                    $pull: {requests: this.name }
                  }
              );
         });

        $('.notApproved:checked').each(function() {
              var col = tmpl.data;
              Collaborations.update({_id: col._id}, { $pull: {requests: this.name }});
         });

        goCollaborationlist();

    }
});
