// ==UserScript==
// @name         Travian digitise report
// @namespace    https://github.com/mondwan
// @description  Digitalize resources directly on the page
// @author       Mond Wan
// @include      http://*.travian.*/berichte.php*
// @include      http://*.travian.*/position_details.php*
// @grant        none
// @run-at       document-end
// @version      2.3
// @updateURL    https://github.com/mondwan/TravianDigitiseReport/raw/master/TravianDigitiseReport.user.js
// @downloadURL  https://github.com/mondwan/TravianDigitiseReport/raw/master/TravianDigitiseReport.user.js
// @homepage     https://github.com/mondwan/TravianDigitiseReport
// ==/UserScript==

(function () {
    var PATHNAME = document.location.pathname.split('/')[1];

    function digitiseLoading (actualLoad, maxLoad, loadRate) {
        var ret;

        if (PATHNAME === 'berichte.php') {
            ret = document.createElement('span');
            ret.textContent = loadRate + '%';
        } else if (PATHNAME === 'position_details.php') {
            ret = document.createElement('p');
            ret.textContent = actualLoad + ':' + loadRate +'%';
            ret.style.cssFloat = 'right';
            ret.style.marginRight = '55px';
        }

        return ret;
    };

    function renderReport (bag, report) {
        var container;
        if (PATHNAME === 'berichte.php') {
            container = bag.parentElement;
        } else if (PATHNAME === 'position_details.php') {
            container = bag.parentElement;
            container.removeChild(bag);
        }
        container.appendChild(report);
    };

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
            var loadRate = actualLoad / maxLoad * 100;

            // Round to 2 decimal digits
            loadRate = loadRate.toFixed(2);

            var report = digitiseLoading(actualLoad, maxLoad, loadRate);

            renderReport(bag, report);
        }
    });
})();
