// ==UserScript==
// @name         Travian digitise report
// @namespace    https://github.com/mondwan
// @description  Digitalize resources directly on the page
// @author       Mond Wan
// @include      http://*.travian.*/berichte.php*
// @grant        none
// @run-at       document-end
// @version      2.2
// @updateURL    https://github.com/mondwan/TravianDigitiseReport/raw/master/TravianDigitiseReport.user.js
// @downloadURL  https://github.com/mondwan/TravianDigitiseReport/raw/master/TravianDigitiseReport.user.js
// @homepage     https://github.com/mondwan/TravianDigitiseReport
// ==/UserScript==

(function () {
    // Get all elements with report info
    var bags = document.getElements('img.reportInfo.carry');

    // Digitise carry info in each bag
    bags.forEach(function (bag) {
        // Get loading information
        var stat = bag.alt;
        var tokens = stat.split('/');
        var actualLoad = parseInt(tokens[0], 10);
        var maxLoad = parseInt(tokens[1], 10);

        if (isFinite(actualLoad) && isFinite(maxLoad)) {
            // Calculate load rate
            var load = actualLoad / maxLoad * 100;

            // Round to 2 decimal digits
            load = load.toFixed(2);

            // An element carray load rate
            var report = document.createElement('span');
            report.textContent = load + '%';

            // Render that element in DOM
            var container = bag.parentElement;
            container.appendChild(report);
        }
    });
})();
