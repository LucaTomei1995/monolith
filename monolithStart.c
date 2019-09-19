#include <stdio.h>
#include <stdlib.h>
#include <unistd.h>

int main(int argc, char const *argv[]){
	int res = chdir("/home/lucasmac/Desktop/Tirocinio/monolith/");
	res = system("gnome-terminal --geometry 73x20+100+300 -- sh -c 'psql -U postgres -h localhost;exec bash'");
	if(res != 0)	return 1;
	res = system("gnome-terminal --geometry 73x20+100+300 -- sh -c 'npm start;exec bash'");
	if(res != 0)	return 1;
	return 0;
}