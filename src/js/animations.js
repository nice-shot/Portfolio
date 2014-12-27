var Effects = (function (eff) {
  /*
  Adds the typeIn effect for the programming title
  */
  eff.programmingTypeIn = function () {
    var programmingTitle = $("#interests > #programming > h3 > span");
    var value = programmingTitle.text();
    programmingTitle.text("");
    programmingTitle.typed({
      strings: [value],
      typeSpeed: 35,
      startDelay: 1000,
    });
  };

  return eff;
} (Effects || {}));
