//
//  RNLinearGradient.h
//  MyReactNative
//
//  Created by Li Yan on 16/3/14.
//  Copyright © 2016年 Facebook. All rights reserved.
//

#import "RCTView.h"
#import "RNLinearGradient.h"
#import "RCTViewManager.h"


@interface RNLinearGradient : RCTView

@property (nonatomic, strong, nonull, readonly) NSArray *locations;
@property (nonatomic, assign) NSArray *colors;

@end
