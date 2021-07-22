module("Classes Utilitárias");

test("StringUtils.replaceAll", function() {
	var str = StringUtils.replaceAll("abba", "a", "b");

  	ok(str == "bbbb", "Passed!");
});

test("JSUtils.generateUUID", function() {
	var str = JSUtils.generateUUID();

  	ok(str != null, "Passed!");
});

test("JSUtils.addMethod", function() {
	var obj = new Object();

	JSUtils.addMethod(obj, "getString", function(a, b){return a + b;});
	JSUtils.addMethod(obj, "getString", function(a){return a;});

	var str1 = obj.getString("ab", "ba");
	var str2 = obj.getString("abba");
  	
  	ok(str1 == str2, "Passed!");
});

test("ArrayUtils.putElement", function() {
	var array = new Array();

	array = ArrayUtils.putElement(array, "key", "element");

  	ok(array["key"], "Passed!");
});

test("ArrayUtils.removeElementByKey", function() {
	var array = new Array();

	array = ArrayUtils.putElement(array, "key", "element");
	array = ArrayUtils.removeElementByKey(array, "key");

  	ok(array["key"] == undefined, "Passed!");
});

test("ArrayUtils.getElementByKey", function() {
	var array = new Array();

	array = ArrayUtils.putElement(array, "key", "element");

	var e = ArrayUtils.getElementByKey(array, "key");

  	ok(e != null, "Passed!");
});

test("ArrayUtils.addElement", function() {
	var array = new Array();

	array = ArrayUtils.addElement(array, "element");

  	ok(array.length == 1, "Passed!");
});

test("ArrayUtils.removeElement", function() {
	var array = new Array();

	var e = new Object();
	e.id = "id_1";

	var e2 = new Object();
	e2.id = "id_1";

	array = ArrayUtils.addElement(array, e);
	array = ArrayUtils.addElement(array, e2);

	array = ArrayUtils.removeElement(array, e2);

  	ok(array.length == 1, "Passed!");

  	array = ArrayUtils.removeElement(array, e);

  	ok(array.length == 0, "Passed!");
});

test("ArrayUtils.getElement", function() {
	var array = new Array();

	var e = new Object();
	e.id = "id_1";

	array = ArrayUtils.addElement(array, e);

	var en = ArrayUtils.getElement(array, "id_1");

  	ok(e == en, "Passed!");
});

test("ArrayUtils.getIndexOf", function() {
	var array = new Array();

	var e = new Object();
	e.id = "id_1";

	array = ArrayUtils.addElement(array, e);

  	ok(ArrayUtils.getIndexOf(array, e) == 0, "Passed!");
  	ok(ArrayUtils.getIndexOf(array, "id_1") == -1, "Passed!");
});

test("ArrayUtils.contains", function() {
	var array = new Array();

	array = ArrayUtils.addElement(array, "ELEMENT");

	ok(!ArrayUtils.contains(array, "NO_ELEMENT"), "Passed!");
  	ok(ArrayUtils.contains(array, "ELEMENT"), "Passed!");
});

test("ComponentUtils.addComponent", function() {
	var object = new Object();

	var component = new Object();
	component.getTag = function(){return "COMPONENT_TAG"};

	ComponentUtils.addComponent(object, component);

	ok(ComponentUtils.getComponent(object, "COMPONENT_TAG") == component, "Passed!");
});

test("ComponentUtils.removeComponent", function() {
	var object = new Object();

	var component = new Object();
	component.getTag = function(){return "COMPONENT_TAG"};

	ComponentUtils.addComponent(object, component);

	ComponentUtils.removeComponent(object, component);

	ok(ComponentUtils.getComponent(object, "COMPONENT_TAG") == undefined, "Passed!");
});

test("ComponentUtils.getComponent", function() {
	var object = new Object();

	var component = new Object();
	component.getTag = function(){return "COMPONENT_TAG"};

	ComponentUtils.addComponent(object, component);

	ok(ComponentUtils.getComponent(object, "COMPONENT_TAG") == component, "Passed!");
});

module("Assets");

test("Asset", function() {
	var image = new Asset().initialize("AS_1", "./image.png", "IMAGE");
	var audio = new Asset().initialize("AS_2", "./audio.wav", "AUDIO");

	ok(image.id == "AS_1", "Passed!");
	ok(image.path == "./image.png", "Passed!");
	ok(image.assetType == "IMAGE", "Passed!");
	ok(image.getAssetInstance() != null, "Passed!");
	ok(audio.getAssetInstance() != null, "Passed!");
});