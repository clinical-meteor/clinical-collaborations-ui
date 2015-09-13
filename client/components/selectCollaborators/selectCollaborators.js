Template.selectCollaborators.rendered = function(postTemplate) {

    var $sc = $(this.find(".selectCollaborators"));
    $sc.select2({tags: Collaboration.getNames(), width:"600px"});

    var inits = [];
    if (this.data && this.data.collaboration )
        this.data.collaboration.map(function(v) { inits.push(v); });
    else {
        var cn = Session.get("collaborationName");
        if (cn)
            inits.push(cn);

        var u = Meteor.user();
        var em = getEmails();

        if (u && em)
            inits.push(em[0]);
        if (u && u.profile && u.profile.defaultCollaboration && u.profile.defaultCollaborations.length > 0)
            inits.push( u.profile.defaultCollaboration);
    }

    if (inits.length > 0)
        $sc.select2("data", inits.map(function(cs) { return {id: cs, text:cs}}));
};
