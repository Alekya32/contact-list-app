var app=angular.module("myContactApp",[])
app.controller("myContactController",["$scope","$http",function($scope,$http){
	refresh()
	$scope.createContact=function(){
		$http.post("/createContact",$scope.contact)//endpoint in server.js and here should be same 		
			.then(function(response){
				/*console.log(response.data)*/
				$scope.contact={};//to reset after inserting
				refresh(); //to see data immediately after adding in page
			})
	}

	function refresh()	{
		$http.get("/getContacts")
		.then(function(response){
			console.log(response)
			$scope.contactList=response.data;
		})
	}
	$scope.editContact=function(id){
		$http.get("/getContactById/" +id)//getContactById gives a singlerow
		.then(function(response){
			$scope.contact=response.data;
		})
	}
	$scope.updateContact=function(){
		$http.put("updateContact/" +$scope.contact._id,$scope.contact) 
		.then(function(response){
			refresh();
		})
	}

	$scope.removeContact=function(id){
		$http.delete("/removeContact/" +id)
		.then(function(response){
			refresh();
		})
	}
}])



	/*var Contact1={
		name:"Alekya",
		mobile:"7984556513",
		email:"alekya@gmail.com"
	}
	var Contact2={
		name:"usha",
		mobile:"1564686574",
		email:"usha@yahoo.com"
	}
	var Contact3={
		name:"Raju",
		mobile:"7846514331",
		email:"raju@ymail.com"
	}
	var contactList=[Contact1,Contact2,Contact3];
	$scope.contactList=contactList;
*/