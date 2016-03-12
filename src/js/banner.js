var bannerModule=angular.module("BannerModule",
	["AJAXModule", "MainModule"]);

bannerModule.controller("BannerController", ["$scope", "CommonAJAX", function ($scope, CommonAJAX, fail) {
	$scope.banner1=[];
	$scope.banner2=[];

	$scope.refresh=function () {
		CommonAJAX.get("banner", "get", function (data) {
			$scope.banner1=data.banner;
		}, function (){}, {whichpage: "index"});

		CommonAJAX.get("banner", "get", function (data) {
			$scope.banner2=data.banner;
		}, function (){}, {whichpage: "voice_channel_list"});		
	};

	$scope.input={
		title: "",
		img: "",
		url: ""
	};

	$scope.args={
		whichpage: "index",
		uid: $.cookie("admin-uid"),
		token: $.cookie("admin-token")
	};

	$scope.select=function (whichpage) {
		$scope.args.whichpage=whichpage;
	};

	$scope.check=function () {
		$scope.warn=[];
		for(var i=0;i<3;i++)
			$scope.warn[i]=false;
		$scope.warn[0]=$scope.isTitleEmpty=$scope.input.title=="";
		$scope.warn[1]=$scope.isURLEmpty=$scope.input.url=="";
		$scope.warn[2]=$scope.isImgEmpty=$scope.input.img=="";
		return !$scope.warn[0]&&!$scope.warn[1]&&!$scope.warn[2];
	};

	$scope.submit=function () {
		if($scope.check()) {
			CommonAJAX.post("banner", "post", function () {
				alert("提交成功");
				$scope.refresh();
			}, fail, $scope.input, $scope.args);			
		}
		else
			alert("表单不完整, 请把有*标记的地方填完");
	};

	$scope.refresh();
}]);