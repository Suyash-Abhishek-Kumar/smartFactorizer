from flask import Flask, request, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

PLUS = "+"
MINUS = "-"
BEST = "="
final_factors, factors = [], []

@app.route('/')
def home(): return "Flask Backend is Running!"

def is_prime(num):
        for i in range(2, num // 2):
            if num % i == 0: return False
        return True

def factor(number):
    for i in range(2, number // 2):
        if number % i == 0:
            return i
    else:
        return number

def print_factors(lst, last, sub=0):
    lst_new = compress(lst)
    factors.append(lst_new)
    print(last, end=": ")
    if sub < 0:
        # print(lst_new[-1], end=" ")
        # print("-", abs(sub))
        factors[-1].append(-1)
    elif sub > 0:
        # print(lst_new[-1], end=" ")
        # print("+", sub)
        factors[-1].append(1)
    else:
        pass
        # print(lst_new[-1])
    # print(factors)

def compress(lst):
    new_lst = []
    unique = set(lst)
    for i in unique:
        new_lst.append(pow(i, lst.count(i)))
    return sorted(new_lst)


class Factorize:
    def __init__(self):
        self.nums = [1, 2, 3, 5, 6, 7, 11, 13, 17]
        self.factors = []
        self.temp = []
        self.done = False
        self.required = set()

    def reset(self):
        self.factors = []
        self.temp = []
        self.done = False
        self.required = set()

    def break_last_best(self, num):
        temp = []
        last_copy = num
        count = 0
        while factor(num) == num and num not in self.nums:
            if num % 10 >= 5:
                num += 1
                count -= 1
            else:
                num -= 1
                count += 1
        if count not in self.required: self.required.add(abs(count))
        while num > 1:
            temp.append(factor(num))
            num //= temp[-1]
            if temp[-1] not in self.required: self.required.add(temp[-1])
        print_factors(temp, last_copy, count)

    def break_last_minus(self, num):
        temp = []
        last_copy = num
        count = 0
        while factor(num) == num and num not in self.nums:
            num += 1
            count -= 1
        if count not in self.required: self.required.add(abs(count))
        while num > 1:
            temp.append(factor(num))
            num //= temp[-1]
            if temp[-1] not in self.required: self.required.add(temp[-1])
        print_factors(temp, last_copy, count)
    
    def break_last_plus(self, num):
        temp = []
        last_copy = num
        count = 0
        while factor(num) == num and num not in self.nums:
            num -= 1
            count += 1
        if count not in self.required: self.required.add(abs(count))
        while num > 1:
            temp.append(factor(num))
            num //= temp[-1]
            if temp[-1] not in self.required: self.required.add(temp[-1])
        print_factors(temp, last_copy, count)

    def check_required(self, *args):
        if PLUS in args:
            while not self.done:
                count = 0
                for i in self.required:
                    if i not in self.nums:
                        self.required.remove(i)
                        self.break_last_plus(i)
                        count += 1
                        break
                if not count: self.done = True
        elif BEST in args:
            while not self.done:
                count = 0
                for i in self.required:
                    if i not in self.nums:
                        self.required.remove(i)
                        self.break_last_best(i)
                        count += 1
                        break
                if not count: self.done = True
        else:
            while not self.done:
                count = 0
                for i in self.required:
                    if i not in self.nums:
                        self.required.remove(i)
                        self.break_last_minus(i)
                        count += 1
                        break
                if not count: self.done = True

    
    def run(self, x):
        # taking input
        x_copy = x
        required = []

        for _ in range(3):
            print()
            match _:
                case 0: method = '+'
                case 1: method = '-'
                case _: method = '='
            # prime factorization
            if not is_prime(x):
                while x > 1:
                    self.factors.append(factor(x))
                    x //= self.factors[-1]
                print_factors(self.factors, x_copy)
            else:
                match _:
                    case 0: self.break_last_plus(x)
                    case 1: self.break_last_minus(x)
                    case 2: self.break_last_best(x)
                self.factors = self.temp.copy()
            for i in self.factors: self.required.add(i)

            # break the last element
            match _:
                    case 0:
                        self.check_required(PLUS)
                        final_factors.append(factors.copy())
                        factors.clear()
                    case 1:
                        self.check_required(MINUS)
                        final_factors.append(factors.copy())
                        factors.clear()
                    case 2:
                        self.check_required(BEST)
                        final_factors.append(factors.copy())
                        factors.clear()
            required.append(sorted(list(self.required)))
            self.reset()
            x = x_copy
        return required

@app.route('/factorize', methods=['POST'])
def run():
    global final_factors
    final_factors = []
    data = request.json
    number = int(data.get("number", 0))
    beltmatic = Factorize()
    req = beltmatic.run(number)
    return jsonify({"result": [req, final_factors]})

if __name__ == "__main__":
    app.run(debug=True)