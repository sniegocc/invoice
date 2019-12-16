angular.module('calcApp', [])
        .controller('calcAppCtrl', function ($scope) {
            var calcList = this;
            calcList.items = [
                {lp: 1,name: 'Koszt 1', count: 1},
                {lp: 2,name: 'Koszt 2', count: 2}];

            calcList.options = [
                {label: 'lp', flag: true, text: 'Lp.', colOpt: '', editable: false},
                {label: 'name', flag: true, text: 'Nazwa towaru/usługi', colOpt: '', editable: true},
                {label: 'count', flag: true, text: 'Ilość', colOpt: '', editable: true},
                {label: 'unit', flag: true, text: 'Jednostka', colOpt: '', editable: true},
                {label: 'net', flag: true, text: 'Cena netto', colOpt: '', editable: true},
                {label: 'gross', flag: true, text: 'Cena brutto', colOpt: '', editable: true},
                {label: 'rabat', flag: true, text: 'Rabat', colOpt: '', editable: true},
                {label: 'rabNet', flag: true, text: 'Cena netto po rabacie', colOpt: '', editable: true},
                {label: 'vat', flag: true, text: 'Vat', colOpt: '', editable: true},
                {label: 'costNet', flag: true, text: 'Wartość netto', colOpt: '', editable: true},
                {label: 'costGros', flag: true, text: 'Wartość brutto', colOpt: '', editable: true}];

            calcList.newItem = function () {
                calcList.items.push({name: '', count: ''});

            };

            calcList.addItem = function () {
                var lpCount = calcList.items.length + 1;
                calcList.items.push({name: calcList.name, count: calcList.count, lp: lpCount});
                calcList.name = '';
                calcList.count = '';
            };

            calcList.totalCount = function () {
                return calcList.length;
            };

            calcList.fullCost = function () {
                var fullCost = 0;
                angular.forEach(calcList.items, function (item) {
                    console.log(item.cost, parseFloat(item.cost))
                    if (!isNaN(item.cost)) {
                        fullCost += parseFloat(item.cost);
                    }
                });
                return Number(fullCost).toFixed(2);
            };
            
            calcList.isActive = function (labelName) {
                var index = _.findWhere(calcList.options, {label: labelName});
                console.log(labelName, index)
                return calcList.options[index]['flag'];
            }
            
            $scope.$watch(function () {
                calcList.summary = calcList.fullCost();
            });


        });
