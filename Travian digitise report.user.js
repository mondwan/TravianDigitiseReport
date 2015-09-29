// ==UserScript==
// @name         Travian digitise report
// @namespace    https://github.com/mondwan
// @description  Digitalize resources directly on the page
// @author       Mond Wan
// @include      http://*.travian.*/berichte.php*
// @grant        none
// @run-at       document-end
// @version      1
// @updateURL    https://github.com/mondwan/TravianDigitiseReport/raw/master/Travian%20digitise%20report.user.js
// @downloadURL  https://github.com/mondwan/TravianDigitiseReport/raw/master/Travian%20digitise%20report.user.js
// @homepage     https://github.com/mondwan/TravianDigitiseReport
// ==/UserScript==

(function () {
    // Get all elements with report info
    var bags = document.getElements('img.reportInfo');

    // Digitise carry info in each bag
    bags.forEach(function (bag) {
        // Calculate load rate
        var stat = bag.alt;
        var tokens = stat.split('/');
        var actualLoad = parseInt(tokens[0], 10);
        var maxLoad = parseInt(tokens[1], 10);
        var load = actualLoad / maxLoad * 100;

        // An element carray load rate
        var report = document.createElement('span');
        load = load.toFixed(2);
        report.innerText = load + '%';

        // Render that element in DOM
        var container = bag.parentElement;
        container.appendChild(report);
    });
})();
