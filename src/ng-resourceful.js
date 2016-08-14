(function() {
    'use strict';

    angular.module('ngResourceful', [])
        .factory('Resourceful', Resourceful);

    /**
     * 统一资源生成器
     * @param {$http} $http angular 内置方法
     */
    function Resourceful($http) {
        function ResourceConstructor(options) {
            var _uri = options.uri;
            var _isArray = options.isArray;
            var _res = options.target || (_isArray ? [] : {});

            Object.defineProperties(
                _res, {
                    'setData': {
                        value: _defineSetDataFunction(_isArray)
                    },
                    'get': {
                        value: _get
                    },
                    'add': {
                        value: _add
                    },
                    'update': {
                        value: _update
                    },
                    'delete': {
                        value: _delete
                    },
                    'isResource': {
                        value: true
                    }
                }
            );

            function _defineSetDataFunction(_isArray) {
                if (_isArray) {
                    return function(_data) {
                        _res.length = 0;
                        _res.splice.apply(_res, [1, 0].concat(_data));
                    };
                } else {
                    return function(_data) {
                        angular.copy(_res, _data);
                    };
                }
            }

            function _get() {
                return $http.get(_uri).then(function successCb(_data) {
                        _res.setData(_data.data);
                    });
            }

            function _add(_newData) {
                return $http.post(_uri, _newData).then(function(_data) {
                    // 
                });
            }

            function _update(_newData) {
                return $http.put(_uri, _newData).then(function(_data) {
                    // 
                });
            }

            function _delete(_items) {
                var items = [];
                return $http.delete(_uri, {
                    params: {
                        del: _items
                    }
                })
            }
            return _res;
        }

        return ResourceConstructor;
    }
    Resourceful.$injector = ['$http'];


})();