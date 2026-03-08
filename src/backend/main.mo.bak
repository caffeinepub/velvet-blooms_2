import Text "mo:core/Text";
import List "mo:core/List";
import Order "mo:core/Order";
import Int32 "mo:core/Int32";
import Array "mo:core/Array";
import Runtime "mo:core/Runtime";

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

  let productList = List.empty<Product>();

  let initialProducts : [Product] = [
    {
      id = "1";
      name = "Single Flower Bouquet";
      price = Int32.fromInt(99);
      description = "A beautiful single flower bouquet.";
      imageUrl = "";
      isBestseller = false;
    },
    {
      id = "2";
      name = "Double Flower Bouquet";
      price = Int32.fromInt(199);
      description = "A lovely double flower bouquet.";
      imageUrl = "";
      isBestseller = false;
    },
    {
      id = "3";
      name = "Triple Flower Bouquet";
      price = Int32.fromInt(299);
      description = "A stunning triple flower bouquet.";
      imageUrl = "";
      isBestseller = false;
    },
    {
      id = "4";
      name = "Five Flower Bouquet";
      price = Int32.fromInt(499);
      description = "An elegant five flower bouquet.";
      imageUrl = "";
      isBestseller = false;
    },
    {
      id = "5";
      name = "Seven Flower Bouquet";
      price = Int32.fromInt(699);
      description = "A luxurious seven flower bouquet.";
      imageUrl = "";
      isBestseller = false;
    },
    {
      id = "6";
      name = "Evil Eye Pot";
      price = Int32.fromInt(649);
      description = "A unique evil eye pot.";
      imageUrl = "";
      isBestseller = false;
    },
    {
      id = "7";
      name = "Single Sunflower";
      price = Int32.fromInt(249);
      description = "A bright single sunflower.";
      imageUrl = "";
      isBestseller = false;
    },
    {
      id = "8";
      name = "Single Rose (various colors)";
      price = Int32.fromInt(199);
      description = "A classic single rose in various colors.";
      imageUrl = "";
      isBestseller = false;
    },
    {
      id = "9";
      name = "Small Beautiful Pots";
      price = Int32.fromInt(149);
      description = "Small, beautiful pots for decoration.";
      imageUrl = "";
      isBestseller = false;
    },
    {
      id = "10";
      name = "Small Sunflower";
      price = Int32.fromInt(99);
      description = "A adorable small sunflower.";
      imageUrl = "";
      isBestseller = false;
    },
  ];

  // Add initial products to the list
  for (product in initialProducts.values()) {
    productList.add(product);
  };

  public query ({ caller }) func verifyPasskey(passkey : Text) : async Bool {
    passkey == adminPasskey;
  };

  public query ({ caller }) func getAllProducts() : async [Product] {
    productList.toArray().sort();
  };

  public query ({ caller }) func getProductsByCategory(category : Text) : async [Product] {
    productList.toArray().sort();
  };

  public shared ({ caller }) func createProduct(passkey : Text, product : Product) : async () {
    if (passkey != adminPasskey) { Runtime.trap("Unauthorized") };
    productList.add(product);
  };

  public shared ({ caller }) func updateProduct(passkey : Text, updatedProduct : Product) : async () {
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

  public shared ({ caller }) func deleteProduct(passkey : Text, productId : Text) : async () {
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

  public shared ({ caller }) func updateProductDescription(passkey : Text, productId : Text, newDescription : Text) : async () {
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
