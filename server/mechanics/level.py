import math


class Level:
    MinLevel = 1
    MaxLevel = 30
    currentLevel = 1
    treshhold = 50

    MinXP = 0
    MaxXP = 0
    currentXP = 0

    def __init__(self):
        pass

    def percentage(self, part, whole):
        return 100 * float(part)/float(whole)

    def difference(self, start, stop):
        return str(start) - str(stop)
    
    def calcLevel(self):
        requiredXP = math.sqrt(1 - 8 * self.currentLevel * self.treshhold)
        return requiredXP
    def levelup(self):
        if self.currentXP >= self.MaxXP and self.currentLevel < self.MaxLevel:
            self.currentXP = 0
        
    