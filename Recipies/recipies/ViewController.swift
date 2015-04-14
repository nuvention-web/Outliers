//
//  ViewController.swift
//  recipies
//
//  Created by EVA on 4/13/15.
//  Copyright (c) 2015 Lapin. All rights reserved.
//

import UIKit

class Recipies{
    
    var picture : UIImage =  UIImage(named:"")!
    var name : String =  ""
    var right : String = ""
    var left : String =  ""
    
}


class ViewController: UIViewController {
    @IBOutlet weak var myImage: UIImageView!
    @IBOutlet weak var rightButton: UIButton!
    @IBOutlet weak var leftButton: UIButton!
    @IBAction func leftTouch(sender: AnyObject) {
        let base : UIImage = UIImage(named: "2.png")!
        myImage.image = base
        
    }
    @IBAction func rightTouch(sender: AnyObject) {
        let base : UIImage = UIImage(named: "3.png")!
        myImage.image = base
        
        
    }

    override func viewDidLoad() {
        super.viewDidLoad()
        let base : UIImage = UIImage(named: "1.png")!
        myImage.image = base
     
        leftButton.setTitle("Shall we go White?", forState: UIControlState.Normal)
        
        rightButton.setTitle("Keep going Red?", forState: UIControlState.Normal)

        // Do any additional setup after loading the view, typically from a nib.
    }

    override func didReceiveMemoryWarning() {
        super.didReceiveMemoryWarning()
        // Dispose of any resources that can be recreated.
    }


}

