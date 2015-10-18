exports.command = function (newCollaboration) {
  this
    .verify.elementPresent("#collaborationGrid")
    .verify.elementPresent("#collaborationGridElements");

  if (newCollaboration) {
    if (newCollaboration.collaborationName) {
      this
        .verify.elementPresent("#collaborationGridElements .collaboration:nth-child(1)")
        .verify.elementPresent("#collaborationGridElements .collaboration:nth-child(1) .post")
        .verify.elementPresent("#collaborationGridElements .collaboration:nth-child(1) .post .cardBody")
        .verify.elementPresent("#collaborationGridElements .collaboration:nth-child(1) .post .cardBody h2")
        .verify.elementPresent("#collaborationGridElements .collaboration:nth-child(1) .post .cardBody h5")
        .verify.elementPresent("#collaborationGridElements .collaboration:nth-child(1) .post .cardBody p")
        .verify.elementPresent("#collaborationGridElements .collaboration:nth-child(1) .post .cardFooter")
        .verify.containsText("#collaborationGridElements .collaboration:nth-child(1) .post .cardBody h2 a", newCollaboration.collaborationName);
    };
  }

  return this;
};
