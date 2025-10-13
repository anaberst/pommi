import tkinter as tk
from tkinter import ttk

def button_func():
    print('a button was pressed')

# create a window
window = tk.Tk()
window.title('Focus Frog')
window.geometry('800x500')

# tk text
text = tk.Text(master = window)
text.pack()

# ttk label
label = ttk.Label(master = window, text = 'This is a test')
label.pack()

# ttk entry
entry = ttk.Entry(master = window)
entry.pack()

# ttk button
button = ttk.Button(master = window, text = 'A button', command = button_func)
# lambda_example = ttk.Button(master = window, text = 'Click here', command = lambda: print('hello'))
button.pack()



# run
window.mainloop()