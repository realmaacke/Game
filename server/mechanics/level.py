
class Level:
    MinLevel = 1
    MaxLevel = 30
    currentLevel = 1

    MinXP = 0
    MaxXP = 0
    currentXP = 0

    def __init__(self):
        pass


    def CalcDiff(self, start, stop):
        pass

    def levelup(self, level):
        self.currentXP = 0