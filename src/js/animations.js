var Effects = (function (eff) {
  /*
  Adds the typeIn effect for the programming title
  */
  "use strict";

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


var Effects = (function (eff) {
  /*
  Adds the write-on effect for the design title
  */
  "use strict";

  eff.designWriteOn = function () {
    var designTitle = $("#interests > #design > h3");
    var value = designTitle.text();
    designTitle.text("");
    for (var i = 0; i < value.length; i++) {
      var span = $("<span>");
      span.attr("id", "design-letter-" + (i+1));
      span.text(value[i]);
      designTitle.append(span);
      span.addClass("write");
    }
  };

  return eff;
} (Effects || {}));
