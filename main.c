/*

* This a game where two players take turns to join the "dots" horizontally
* The last person to join the dots wins.

* Benny Joseph

* June 21, 2019
*/


#include <stdio.h>
#include <stdlib.h>
#include <string.h>

#define FLUSH() while((getchar()) != '\n')
#define INV_INP_EXIT() {printf("Exit (Invalid Input) \n");FLUSH();getchar();FLUSH();return 0;}

#include "gamefuncs.c"

int main(int argc, char const *argv[])
{	
	int n,i,proceed=1;
	int *win = (int *) malloc(sizeof(int));
	#ifndef __linux__
	system("chcp 65001");
	system("cls");
	#endif
	while(proceed)
	{
		printf("Enter no. of rows(3-11): \n");
		i = scanf("%d",&n);

		if(!i) INV_INP_EXIT();

		if(n>11 || n<3)
			continue;
		clear();

		printf("Do you want the Computer to start?\n(1 - YES)\n(0 - NO)\n");
		proceed = scanf("%d",&i);
		if(!proceed) INV_INP_EXIT()
		
		startgame(n,win,i);
		*win?printf("You won!\n"):printf("You lose\n");
		printf("Press y to play again ");
		
		FLUSH();

		if(getchar() == 'y')
		{
			clear();
			FLUSH();
			proceed = 1;
			continue;
		}
		proceed = 0;
	}
	//This isn't much of a problem
	return 0;
}