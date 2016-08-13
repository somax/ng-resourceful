	angular.module('demoApp', ['ngResourceful'])
        .factory('ResrOrgs', ResrOrgs)
        .controller('mainController', mainController)

	function ResrOrgs(Resourceful) {
		return new Resourceful({ 
                     uri : '/api/orgs',
                     isArray : true
                });
	}
 	ResrOrgs.$injector = ['Resourceful'];

 	function mainController(ResrOrgs,Resourceful) {
 		var mc = this;
 		mc.orgs = ResrOrgs;
 		ResrOrgs.setData([{id:123}])
 		ResrOrgs.get().then(function () {
 			console.log('success');
 		},function () {
 			console.error('error');
 		})

        mc.getThis = function (org) {

            if(!org.isResource){
                Resourceful({target:org, uri:'/api/orgs/'+org.id})
            }
            console.log(org)
            org.get().then(function(){
                console.log('>>>',org);
            })

        }

 	}