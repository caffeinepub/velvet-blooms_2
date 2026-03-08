import Text "mo:core/Text";
import List "mo:core/List";
import Order "mo:core/Order";
import Int32 "mo:core/Int32";
import Array "mo:core/Array";
import Runtime "mo:core/Runtime";

// Explicit migration: discard the old `initialProducts` stable variable
(with migration =
  func(_ : {
    initialProducts : [{
      id : Text;
      name : Text;
      price : Int32;
      description : Text;
      imageUrl : Text;
      isBestseller : Bool;
    }]
  }) : {} { {} }
)
actor {
  let adminPasskey = "Twentyseven@27withThree@03";

  type Product = {
    id : Text;
    name : Text;
    price : Int32;
    description : Text;
    imageUrl : Text;
    isBestseller : Bool;
  };

  module Product {
    public func compare(product1 : Product, product2 : Product) : Order.Order {
      Text.compare(product1.id, product2.id);
    };
  };

  // Persistent product list — no seeding on startup
  let productList = List.empty<Product>();

  public query ({ caller = _ }) func verifyPasskey(passkey : Text) : async Bool {
    passkey == adminPasskey;
  };

  public query ({ caller = _ }) func getAllProducts() : async [Product] {
    productList.toArray().sort();
  };

  public query ({ caller = _ }) func getProductsByCategory(_ : Text) : async [Product] {
    productList.toArray().sort();
  };

  public shared ({ caller = _ }) func createProduct(passkey : Text, product : Product) : async () {
    if (passkey != adminPasskey) { Runtime.trap("Unauthorized") };
    productList.add(product);
  };

  public shared ({ caller = _ }) func updateProduct(passkey : Text, updatedProduct : Product) : async () {
    if (passkey != adminPasskey) { Runtime.trap("Unauthorized") };

    let index = productList.toArray().findIndex(
      func(product) { product.id == updatedProduct.id }
    );

    switch (index, productList.toArray().size() > 0) {
      case (?i, true) {
        let newArray = productList.toArray().toVarArray<Product>();
        newArray[i] := updatedProduct;
        productList.clear();
        for (product in newArray.values()) {
          productList.add(product);
        };
      };
      case (_) { Runtime.trap("Product not found") };
    };
  };

  public shared ({ caller = _ }) func deleteProduct(passkey : Text, productId : Text) : async () {
    if (passkey != adminPasskey) { Runtime.trap("Unauthorized") };

    let initialSize = productList.size();
    let filteredProducts = productList.filter(
      func(product) { product.id != productId }
    );

    if (filteredProducts.size() == initialSize) {
      Runtime.trap("Product not found");
    };

    productList.clear();
    for (product in filteredProducts.values()) {
      productList.add(product);
    };
  };

  public shared ({ caller = _ }) func updateProductDescription(passkey : Text, productId : Text, newDescription : Text) : async () {
    if (passkey != adminPasskey) { Runtime.trap("Unauthorized") };

    let index = productList.toArray().findIndex(
      func(product) { product.id == productId }
    );

    switch (index) {
      case (?i) {
        let productsArray = productList.toArray().toVarArray<Product>();
        let originalProduct = productsArray[i];
        let updatedProduct = {
          id = originalProduct.id;
          name = originalProduct.name;
          price = originalProduct.price;
          description = newDescription;
          imageUrl = originalProduct.imageUrl;
          isBestseller = originalProduct.isBestseller;
        };
        productsArray[i] := updatedProduct;

        productList.clear();
        for (product in productsArray.values()) {
          productList.add(product);
        };
      };
      case (null) { Runtime.trap("Product not found") };
    };
  };
};
