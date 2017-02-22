function setMap() {
	var $map = $('#js-gmap');
	var latitude = $map.data('latitude'), // 緯度
		longitude = $map.data('longitude'), // 経度
		title = $map.data('title'); // タイトル
	var targetLatlng = new google.maps.LatLng(latitude, longitude);

	var myOptions = {
		zoom: 15, // 拡大比率
		center: targetLatlng, // 表示枠内の中心点
		mapTypeId: google.maps.MapTypeId.ROADMAP // 表示タイプの指定
	};
	var map = new google.maps.Map(document.getElementById('js-gmap'), myOptions);

	var targetMarker = new google.maps.Marker({
		position: targetLatlng,
		map: map,
		title: 'LIG'
	});

	// infobox用のDOMを生成
	var infoboxContent = '<div class="gmap-info-window-inner"><p class="gmap-info-window-title">代々木ゼミナール本部校</p><p class="gmap-info-window-address">〒151-8559 東京都渋谷区代々木2-25-7</p></div>';

	// infoboxのオプション
	var infoboxOptions = {
		content: infoboxContent,  //表示するHTML
		disableAutoPan: false,
		pixelOffset: new google.maps.Size(-150, -55), // オフセット値
		zIndex: null,
		alignBottom: true,
		position: targetLatlng,
		boxClass: "gmap-info-window",
		enableEventPropagation: true,
		closeBoxMargin: "-15px -20px 0px 0px",
		closeBoxURL: '../images/close.png', // 閉じるボタンのイメージ
		infoBoxClearance: new google.maps.Size(1, 1)
	};
	// infoboxを生成して表示
	var infobox = new InfoBox(infoboxOptions);
	infobox.open(map, targetMarker);

	// マーカーがクリックされた時にinfoboxを表示
	targetMarker.addListener('click', function() {
		infobox.open(map, targetMarker);
	});
}

$(window).on('load', function() {
	setMap();
});