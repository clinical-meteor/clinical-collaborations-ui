exports.command = function (newCollaboration) {
  this
    .verify.elementPresent("#collaborationGrid")
    .verify.elementPresent("#collaborationGridElements");

  if (newCollaboration) {
    if (newCollaboration.collaborationName) {
      this
        .verify.elementPresent("#collaborationGridElements .collaboration:nth-child(1)")
        .verify.elementPresent("#collaborationGridElements .collaboration:nth-child(1)")
        .verify.elementPresent("#collaborationGridElements .collaboration:nth-child(1) .cardBody")
        .verify.elementPresent("#collaborationGridElements .collaboration:nth-child(1) .cardBody h2")
        .verify.elementPresent("#collaborationGridElements .collaboration:nth-child(1) .cardBody h5")
        .verify.elementPresent("#collaborationGridElements .collaboration:nth-child(1) .cardBody p")
        .verify.elementPresent("#collaborationGridElements .collaboration:nth-child(1) .cardFooter")
        .verify.containsText("#collaborationGridElements .collaboration:nth-child(1) .cardBody h2 a", newCollaboration.collaborationName);
    };
  }

  return this;
};
