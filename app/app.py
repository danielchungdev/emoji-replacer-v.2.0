import sys
import os
import pyautogui
import pyperclip
from logging.config import listen
from pynput.keyboard import Key, Listener
import utils.get_delimiter as get_delimiter
import utils.get_emoji as get_emoji

TYPED_KEYS = []
LISTENING = False

def delete_keyword(candidate_keyword):
    pyautogui.press('backspace', presses=len(candidate_keyword) + 2)

def past_emoji(emoji, candidate_keyword):
    delete_keyword(candidate_keyword)
    pyperclip.copy(emoji)
    if sys.platform == "win32":
        pyautogui.hotkey('ctrl', 'v')
    if sys.platform == "darwin":
        pyautogui.keyDown('command')
        pyautogui.keyDown('v')
        pyautogui.keyUp('command')
        pyautogui.keyUp('v')

def on_press(key):
    global TYPED_KEYS
    global LISTENING

    delimiter = get_delimiter.get_delimiter()
    key_str = str(key).replace('\'', '')

    print(key_str)
    sys.stdout.flush()

    if LISTENING: 
        if (key == Key.enter):
            LISTENING = False
            
        if (key == Key.backspace):

            if len(TYPED_KEYS) < 1:
                LISTENING = False
            else:
                TYPED_KEYS.pop()

        if key_str.isalpha() and key_str != delimiter:
            TYPED_KEYS.append(key_str)

        if key_str == delimiter:

            print("end")
            sys.stdout.flush()

            candidate_keyword = "".join(TYPED_KEYS)

            if candidate_keyword != "":
                emoji = get_emoji.get_emoji(candidate_keyword)
                if candidate_keyword == 'quit':
                    delete_keyword(candidate_keyword)
                    quit()
                if emoji: 
                    past_emoji(emoji, candidate_keyword)
                LISTENING = False

    elif key_str == delimiter and LISTENING == False:
        print("start")
        sys.stdout.flush()
        TYPED_KEYS = []
        LISTENING = True

def main():
    print("Now listening...")
    sys.stdout.reconfigure(encoding="utf8")
    with Listener(on_press=on_press) as listener:
        listener.join()

if __name__ == "__main__":
    main()