angular.module('calcApp', [])
        .controller('calcAppCtrl', function ($scope) {
            var calcList = this;
            calcList.items = [{lp: 1}];

            calcList.options = [
                {label: 'lp', flag: true, text: 'Lp.', colOpt: '', editable: false, maxlength: 4},
                {label: 'name', flag: true, text: 'Nazwa towaru/usługi', colOpt: 'col-4', editable: true, maxlength: 100},
                {label: 'count', flag: true, text: 'Ilość', colOpt: '', editable: true, maxlength: 4},
                {label: 'unit', flag: true, text: 'Jednostka', colOpt: '', editable: true, maxlength: 5},
                {label: 'net', flag: true, text: 'Cena netto', colOpt: '', editable: true, maxlength: 10},
                {label: 'gross', flag: true, text: 'Cena brutto', colOpt: '', editable: true, maxlength: 10},
                {label: 'rabat', flag: true, text: 'Rabat', colOpt: '', editable: true, maxlength: 3},
                {label: 'rabNet', flag: true, text: 'Cena netto po rabacie', colOpt: '', editable: false, maxlength: 10},
                {label: 'vat', flag: true, text: 'Vat', colOpt: '', editable: true, maxlength: 3},
                {label: 'costVat', flag: true, text: 'Kwota Vat', colOpt: '', editable: false, maxlength: 10},
                {label: 'costNet', flag: true, text: 'Wartość netto', colOpt: '', editable: false, maxlength: 10},
                {label: 'costGros', flag: true, text: 'Wartość brutto', colOpt: '', editable: false, maxlength: 10}];

            calcList.countingOption = {
                model: null,
                options: [
                    {id: 'netto', name: 'Licz na podstawie ceny netto'},
                    {id: 'brutto', name: 'Licz na podstawie ceny brutto'},
                ]
            };
            calcList.countingOption.model = 'netto';

            calcList.newItem = function () {
                var lpCount = calcList.items.length + 1;
                calcList.items.push({lp: lpCount});
            };

            calcList.totalCount = function () {
                return calcList.length;
            };

            calcList.fullCost = function (label) {
                var fullCost = 0;
                angular.forEach(calcList.items, function (item) {
                    console.log(item[label], parseFloat(item[label]))
                    if (!isNaN(item[label])) {
                        fullCost += parseFloat(item[label]);
                    }
                });
                return Number(fullCost).toFixed(2);
            };

            $scope.reCalc = function ($item) {
                console.log('this', $item);
                if (calcList.countingOption.model == 'netto') {
                    countByNetto($item);
                } else {
                    countByBrutto($item);
                }
            };

            function countByNetto($item) {
                if ($item['net'] && $item['rabat']) {
                    $item['rabNet'] = Number($item['net'] - $item['net'] * $item['rabat'] / 100).toFixed(2);
                }
                if ($item['net'] && $item['count'] && $item['rabNet']) {
                    $item['costNet'] = $item['rabNet'] * $item['count'];
                    if ($item['vat']) {
                        console.log($item['rabNet'] + $item['rabNet'] * $item['vat'] / 100)
                        $item['gross'] = Number(parseFloat($item['rabNet']) + parseFloat($item['rabNet']) * parseFloat($item['vat']) / 100).toFixed(2);
                        $item['costGros'] = Number(parseFloat($item['gross']) * parseFloat($item['count'])).toFixed(2);
                    }
                } else if ($item['net'] && $item['count']) {
                    $item['costNet'] = Number($item['net'] * $item['count']).toFixed(2);
                    if ($item['vat']) {
                        $item['gross'] = Number($item['net'] + $item['net'] * $item['vat'] / 100).toFixed(2);
                        $item['costGros'] = Number($item['gross'] * $item['count']).toFixed(2);
                    }
                }
            }
            
            function countByBrutto($item) {
                if ($item['net'] && $item['rabat']) {
                    $item['rabNet'] = Number($item['net'] - $item['net'] * $item['rabat'] / 100).toFixed(2);
                }
                if ($item['net'] && $item['count'] && $item['rabNet']) {
                    $item['costNet'] = $item['rabNet'] * $item['count'];
                    if ($item['vat']) {
                        $item['gross'] = Number($item['rabNet'] + $item['rabNet'] * $item['vat'] / 100).toFixed(2);
                        $item['costGros'] = Number($item['gross'] * $item['count']).toFixed(2);
                    }
                } else if ($item['net'] && $item['count']) {
                    $item['costNet'] = Number($item['net'] * $item['count']).toFixed(2);
                    if ($item['vat']) {
                        $item['gross'] = Number($item['net'] + $item['net'] * $item['vat'] / 100).toFixed(2);
                        $item['costGros'] = Number($item['gross'] * $item['count']).toFixed(2);
                    }
                }
            }

            $scope.$watch(function () {
                calcList.summary = calcList.fullCost();

                if (calcList.countingOption.model == 'netto') {
                    console.log(_.findWhere(calcList.options, {label: 'net'})['flag'])
                    _.findWhere(calcList.options, {label: 'net'})['flag'] = true;
                    _.findWhere(calcList.options, {label: 'gross'})['flag'] = false;

                } else {
                    _.findWhere(calcList.options, {label: 'net'})['flag'] = false;
                    _.findWhere(calcList.options, {label: 'gross'})['flag'] = true;
                }
            });


        });

