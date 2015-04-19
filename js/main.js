window.onload = function(){
	var map = [];
	base(4,4,3);
	var assetToLoader = ['img/sprites.json'];
	loader = new PIXI.AssetLoader(assetToLoader);
	loader.onComplete = view(0, 0);
	loader.load();
	var stage = new PIXI.Stage(0xFFFFFF);
	var renderer = PIXI.autoDetectRenderer(800, 600);
	var layer = new PIXI.DisplayObjectContainer();
	stage.addChild(layer);

	function base(x, z, y){
		x = Math.pow(2, x); z = Math.pow(2, z); y = Math.pow(2, y);
		var heightMap = []; for (var i = 0; i < x; i++){ heightMap[i] = []; for(var j = 0; j < z; j++){ heightMap[i][j] = 0;}}
		createArray(x, z, y);
		function createArray(x, z, y){
			for (var i = 0; i < x; i ++){
				map[i] = [];
				for (var j = 0; j < z; j++){
					map[i][j] = [];
					for (var k = 0; k < y; k++){
						map[i][j][k] = {
							block : 'none'
						};
					};

				}
			};
			noisify(heightMap);
		};

		function noisify(heightMap){
			var range = y/2;
			while (range > 1){
				for (var i = 0; i < x; i+=range){
					for (var j = 0; j < z; j+= range){
						var height = Math.floor(Math.random() * range);
						for (ih = i; ih < i+range; ih++){
							for (jh = j; jh < j+range; jh++){
								heightMap[ih][jh] += height;
							}
						};
					}
				};
				range = range/2;
			};
			applyHeightMap(map, heightMap, y/2-1, 'ground');
		};

		function applyHeightMap(map, heightMap, level, block){
			for(var i = 0; i < x; i++){
				for(var j = 0; j < z; j++){
					for(var k = level; k < level + heightMap[i][j]; k++){
						map[i][j][k].block = block;
					}
				}
			};
			addwater(2);
		};
		function addwater(waterlevel){
			for (var i = 0; i < x; i++){
				for (var j = 0; j < z; j++){
					for (var k = y/2; k < y/2+waterlevel; k++){
						if (map[i][j][k].block == 'none'){
							map[i][j][k].block = 'water';
						};
					};
				}
			}
		};
	};
	function view(x, z){
		
	}

};
