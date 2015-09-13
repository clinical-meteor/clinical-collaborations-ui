Template.collaborationEdit.hooks({
  rendered: function Sel()  {
    var names = [];
    Collaborations.find({}, {fields: {name:1}}).forEach(function(c) { names.push(c.name)});
    var moi = null;
    var defaultCollaboration = null;
    var u = Meteor.user();
    var em = getEmails();
    if (em)
        moi = em[0];
    if (u && u.profile)
        defaultCollaboration = u.profile.defaultCollaboration;

    names = names.sort();
    console.log(names);
    $(".collaboratorInitWithSelf").each(function() {
        var $this = $(this);
        if ($this.val() == "") {
            $this.val(this.name == "collaborators" ? defaultCollaboration: moi);
        }
    });

    $(".collaboratorListClass").select2({tags: names});
    $(".form-control[name*='.']").select2({tags: names});
    $(".collaboratorListClass").addClass("allowToGrow");
    $(".form-control[name*='.']").addClass("allowToGrow");
  }
});
