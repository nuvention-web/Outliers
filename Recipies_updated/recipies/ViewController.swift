//
//  ViewController.swift
//  recipies
//
//  Created by EVA on 4/13/15.
//  Copyright (c) 2015 Lapin. All rights reserved.
//

import UIKit

class Recipies{
    
    lazy var picture : UIImage =  UIImage(named:"")!
    var name : String =  ""
    var cal : String = ""
    var time : String = ""
    var leftRecipe : Recipies!
    var rightRecipe : Recipies!
    var caption : String = ""
    
    
}


class Factory{
    // THIS JUST FOR THE MODEL TO TEST FOR FUNCTIONS
    class func callTree() -> Recipies{
        
        // HEIGHT 3

        var bacon = Recipies()
        bacon.picture = UIImage(named: "7.png")!
        bacon.cal = "350"
        bacon.time = "15min"
        bacon.name = "Bacon Pasta"
        bacon.caption = "Bacon to Add?"

        var mince = Recipies()
        mince.picture = UIImage(named: "9.png")!
        mince.cal = "350"
        mince.time = "15min"
        mince.name = "Mince Meat Pasta"
        mince.caption = "Some Mince Meat?"

        
        var green = Recipies()
        green.picture = UIImage(named: "4.png")!
        green.cal = "150"
        green.time = "15min"
        green.name = "Veg Pasta"
        green.caption = "Some Veggies?"

        
        var sea = Recipies()
        sea.picture = UIImage(named: "5.png")!
        sea.cal = "350"
        sea.time = "15min"
        sea.name = "Seafood Special"
        sea.caption = "Some Seafood Perhaps?"

        
        
        // HEIGTH 2
        var meat = Recipies()
        meat.picture = UIImage(named: "3.png")!
        meat.cal = "550"
        meat.time = "20min"
        meat.name = "Meat Pasta"
        meat.caption = "Put some Meat?"
        meat.leftRecipe = bacon
        meat.rightRecipe = mince
        
        
        var cream = Recipies()
        cream.picture = UIImage(named: "2.png")!
        cream.cal = "250"
        cream.time = "30min"
        cream.name = "Cream Pasta"
        cream.caption = "Something Creamy?"
        cream.leftRecipe = green
        cream.rightRecipe = sea
        
        // Root Node
        var classic = Recipies()
        classic.picture = UIImage(named: "1.png")!
        classic.cal = "250"
        classic.time = "10min"
        classic.name = "Classic Pasta"
        classic.leftRecipe = meat
        classic.rightRecipe = cream
        

        return classic
    }
    
    
    
    
}



class ViewController: UIViewController {
    // OUTLETS
    @IBOutlet weak var nameLabel: UILabel!
    @IBOutlet weak var timeLabel: UILabel!
    @IBOutlet weak var calLabel: UILabel!
    @IBOutlet weak var myImage: UIImageView!
    @IBOutlet weak var rightCaption: UILabel!
    @IBOutlet weak var leftCaption: UILabel!
    @IBOutlet weak var makeButtonIcon: UIButton!
    
    
    // init() ROOT NODE
    var root : Recipies!
    
    // Ingredients Vars
    var makeIsPressed :Bool = false
    var ingView = UIView(frame: CGRectMake(0, 196, 385, 240))
    var ingLabel = UILabel(frame: CGRectMake(0, 100, 385, 240))
    var ingListLabel = UILabel(frame: CGRectMake(0, 240, 385, 240))
    var secretSauceLabel = UILabel(frame: CGRectMake(0, 300, 385, 240))
    let secretRequestButton1:UIButton = UIButton(frame: CGRectMake(150, 380, 70, 40))
    let secretRequestButton2:UIButton = UIButton(frame: CGRectMake(230, 380, 70, 40))
    
    
    // Fork button is Pressed sets start Node
    @IBAction func forkButton(sender: AnyObject) {
        root = Factory.callTree()
        viewDidLoad()
    }

    
    // MakeIT! button is pressed
    @IBAction func makeButton(sender: AnyObject) {
        if(makeIsPressed == false){
            ingView.hidden = false
            ingLabel.hidden = false
            ingListLabel.hidden = false
            secretSauceLabel.hidden = false
            secretRequestButton1.hidden = false
            secretRequestButton2.hidden = false
            
            makeIsPressed = true
        }else{
            ingView.hidden = true
            ingLabel.hidden = true
            ingListLabel.hidden = true
            secretSauceLabel.hidden = true
            secretRequestButton1.hidden = true
            secretRequestButton2.hidden = true
            
            makeIsPressed = false
            
        }
    }
        
    
    func opensauce(sender:UIButton)
    {

        if(sender.tag == 2){
          secretSauceLabel.text = "LOVE"
            
        }else if(sender.tag == 1){
          secretSauceLabel.text = "Dear User1 it is .."
            
        }

        
    }
    
    
    override func viewDidLoad() {

        super.viewDidLoad()

        
        // Set Ingredients into View
        self.view.addSubview(ingView)
        self.view.addSubview(ingLabel)
        self.view.addSubview(ingListLabel)
        self.view.addSubview(secretSauceLabel)

        
        ingView.backgroundColor = UIColor.blackColor().colorWithAlphaComponent(0.5)
        ingLabel.textColor = UIColor.whiteColor()
        ingListLabel.textColor = UIColor.whiteColor()
        secretSauceLabel.textColor = UIColor.whiteColor()
        
        // JUST AS A TESTER
        self.view.addSubview(secretRequestButton1)
        self.view.addSubview(secretRequestButton2)
        
        secretRequestButton1.backgroundColor = UIColor.greenColor()
        secretRequestButton2.backgroundColor = UIColor.greenColor()
        secretRequestButton1.setTitle("Request", forState: UIControlState.Normal)
        secretRequestButton2.setTitle("$Tips", forState: UIControlState.Normal)
        secretRequestButton1.titleLabel!.textColor = UIColor.whiteColor()
        secretRequestButton2.titleLabel!.textColor = UIColor.whiteColor()
        secretRequestButton1.titleLabel!.textAlignment = .Center
        secretRequestButton2.titleLabel!.textAlignment = .Center
        secretRequestButton1.tag = 1
        secretRequestButton2.tag = 2
        secretRequestButton1.addTarget(self, action: "opensauce:", forControlEvents: UIControlEvents.TouchUpInside)
        secretRequestButton2.addTarget(self, action: "opensauce:", forControlEvents: UIControlEvents.TouchUpInside)
    
        // TESTER END
        
        
        ingLabel.text = "Ingredients:                      Rating(4 Stars)"
        secretSauceLabel.text = "SECRET SAUCE"
        ingListLabel.text = "1 pound linguine or spaghetti\n 6 strips bacon, diced\n 4 egg yolks \n1 cup grated Parmesan\n 1/2 teaspoon kosher salt\n 1/4 teaspoon black pepper\n 1/2 cup fresh flat-leaf parsley\n"
        ingListLabel.numberOfLines = 0;
        ingListLabel.lineBreakMode = NSLineBreakMode.ByWordWrapping
        ingListLabel.font = UIFont.systemFontOfSize(16.0);
        ingListLabel.sizeToFit()


        ingLabel.hidden = true
        ingListLabel.hidden = true
        ingView.hidden = true
        secretSauceLabel.hidden = true
        secretRequestButton1.hidden = true
        secretRequestButton2.hidden = true
        


        // Make the MakeIT Picture
        makeButtonIcon.setImage(UIImage(named: "plate.png"), forState: UIControlState.Normal)
        
        
        // SETTING UP VIEWS IN THE BEGINNING
        root = Factory.callTree()
        myImage.image = root.picture
        self.nameLabel.text = root.name
        self.timeLabel.text = root.time
        self.calLabel.text = root.cal
        self.rightCaption.text = root.rightRecipe.caption
        self.leftCaption.text = root.leftRecipe.caption
        
        
        // SETTING UP SWIPE FUNCTIONS
        var leftSwipe = UISwipeGestureRecognizer(target: self, action: Selector("handleSwipes:"))
        var rightSwipe = UISwipeGestureRecognizer(target: self, action: Selector("handleSwipes:"))

        leftSwipe.direction = .Left
        rightSwipe.direction = .Right
        
        view.addGestureRecognizer(leftSwipe)
        view.addGestureRecognizer(rightSwipe)

        
    }

    
    override func didReceiveMemoryWarning() {
        super.didReceiveMemoryWarning()
        // Dispose of any resources that can be recreated.
    }


    
    func handleSwipes(sender:UISwipeGestureRecognizer) {
        if (sender.direction == .Left) {
            println("Swipe Left")

            if(root.leftRecipe != nil){
            root = root.leftRecipe
            myImage.image = root.picture
            self.nameLabel.text = root.name
            self.timeLabel.text = root.time
            self.calLabel.text = root.cal
            
            if(root.leftRecipe != nil){
               self.rightCaption.text = root.rightRecipe.caption
               self.leftCaption.text = root.leftRecipe.caption
             }else{
               self.rightCaption.text = "Sorry this is the End!"
               self.leftCaption.text = "Sorry this is the End!"
             }
                
            }else{
               self.leftCaption.text = "Sorry this is the End!"
                
                
            }
            
            

        }
        
        if (sender.direction == .Right) {
            println("Swipe Right")
            
            if((root.rightRecipe) != nil){
            root = root.rightRecipe
            myImage.image = root.picture
            self.nameLabel.text = root.name
            self.timeLabel.text = root.time
            self.calLabel.text = root.cal

            if(root.leftRecipe != nil){
               self.rightCaption.text = root.rightRecipe.caption
               self.leftCaption.text = root.leftRecipe.caption
             }else{
                    self.rightCaption.text = "Sorry this is the End!"
                    self.leftCaption.text = "Sorry this is the End!"
             }
            
            }else{
                println("Nothing...")
                self.rightCaption.text = "Sorry this is the End!"
            }

        }
    }
    
}

