---
title: Function reference
---

#   R é f é r e n c e   d e s   F o n c t i o n s   { :   d a t a - t o c - l a b e l = ' '   } 
 
 L e s   f o r m u l e s   G r i s t   p r e n n e n t   e n   c h a r g e   l a   p l u p a r t   d e s   f o n c t i o n s   E x c e l ,   a i n s i   q u e   l e   l a n g a g e   d e   p r o g r a m m a t i o n   P y t h o n . 
 
 L e   t a b l e a u   c i - d e s s o u s   r é p e r t o r i e   l e s   f o n c t i o n s   s p é c i f i q u e s   à   G r i s t   e t   l ' e n s e m b l e   d e s   f o n c t i o n s   s i m i l a i r e s   à   E x c e l   i n c l u s e s . 
 D e   p l u s ,   l ' e n s e m b l e   d e   l a   [ b i b l i o t h è q u e   s t a n d a r d   P y t h o n ] ( h t t p s : / / d o c s . p y t h o n . o r g / 3 / l i b r a r y / )   e s t 
 d i s p o n i b l e .   P o u r   e n   s a v o i r   p l u s   s u r   l ' u t i l i s a t i o n   d e s   f o r m u l e s   d a n s   G r i s t ,   c o n s u l t e z   [ I n t r o d u c t i o n   a u x   F o r m u l e s ] ( f o r m u l a s . m d ) . 
 
 [ G r i s t   u t i l i s e   P y t h o n   ( v e r s i o n   3 . 1 1 ) ] ( p y t h o n . m d )   p o u r   l e s   f o r m u l e s .   V o u s   p o u v e z   u t i l i s e r   p r e s q u e   t o u t e s   l e s   f o n c t i o n n a l i t é s   d e 
 P y t h o n   ( v o i r   [ d o c u m e n t a t i o n   P y t h o n ] ( h t t p s : / / d o c s . p y t h o n . o r g / 3 . 1 1 / ) ) .   V o i c i   q u e l q u e s   n o t e s   u t i l e s   : 
 
 -   P y t h o n   e s t   s e n s i b l e   à   l a   c a s s e ,   y   c o m p r i s   p o u r   l e s   n o m s   d e   t a b l e   e t   d e   c o l o n n e   G r i s t .   L e s   f o n c t i o n s   s i m i l a i r e s   à   E x c e l   s o n t 
     t o u j o u r s   e n   m a j u s c u l e s .   P a r   e x e m p l e ,   [ * * i f * * ] ( h t t p s : / / d o c s . p y t h o n . o r g / 3 / t u t o r i a l / c o n t r o l f l o w . h t m l # i f - s t a t e m e n t s ) 
     e s t   u n   m o t - c l é   P y t h o n ,   t a n d i s   q u e   [ * * I F * * ] ( # i f )   e s t   u n e   f o n c t i o n   s i m i l a i r e   à   E x c e l . 
 -   C o m p a r e z   p o u r   l ' é g a l i t é   e n   u t i l i s a n t   ` = = ` ,   à   l a   p l a c e   d u   ` = `   u n i q u e   d ' E x c e l   ( q u i   e n   P y t h o n   s i g n i f i e   a f f e c t a t i o n ) . 
     " D i f f é r e n t "   u t i l i s e   ` ! = `   à   l a   p l a c e   d e   ` < > `   d ' E x c e l . 
 -   V o u s   p o u v e z   é c r i r e   d u   P y t h o n   m u l t i - l i g n e s   d a n s   l e s   f o r m u l e s   ( u t i l i s e z   < c o d e   c l a s s = " k e y s " > * S h i f t *   +   * E n t e r * < / c o d e >   p o u r 
     a j o u t e r   d e s   l i g n e s ) ,   y   c o m p r i s   d e s   i n s t r u c t i o n s ,   d e s   v a r i a b l e s ,   d e s   i m p o r t s ,   e t c . 
 -   L e   c o d e   G r i s t   s ' e x é c u t e   d a n s   u n   s a n d b o x   s é c u r i s é ,   s a n s   a c c è s   à   q u o i   q u e   c e   s o i t   e n   d e h o r s   d e   v o t r e   d o c u m e n t . 
 
 < ! - -   B E G I N   m k p y d o c s   t a b l e   - - > 
 |   C a t é g o r i e   |   F o n c t i o n s   | 
 |   - - -   |   - - -   | 
 |   G r i s t   |   < a     h r e f = " # r e c o r d " > E n r e g i s t r e m e n t < / a >   o u   < a     h r e f = " # r e c o r d " >   r e c < / a > ,   < a     h r e f = " # _ f i e l d " > $ C h a m p < / a >   o u   < a     h r e f = " # _ f i e l d " >   r e c . C h a m p < / a > ,   < a     h r e f = " # _ g r o u p " > $ g r o u p e < / a >   o u   < a     h r e f = " # _ g r o u p " >   r e c . g r o u p e < / a > ,   < a     h r e f = " # r e c o r d s e t " > E n s e m b l e   d ' E n r e g i s t r e m e n t s < / a > ,   < a     h r e f = " # f i n d _ " > f i n d . * < / a > ,   < a     h r e f = " # u s e r t a b l e " > T a b l e   d ' U t i l i s a t e u r s < / a > ,   < a     h r e f = " # a l l " > t o u s < / a > ,   < a     h r e f = " # l o o k u p o n e " > l o o k u p O n e < / a > ,   < a     h r e f = " # l o o k u p r e c o r d s " > l o o k u p R e c o r d s < / a >   | 
 |   C u m u l a t i f   |   < a     h r e f = " # n e x t " > S U I V A N T < / a > ,   < a     h r e f = " # p r e v i o u s " > P R É C É D E N T < / a > ,   < a     h r e f = " # r a n k " > R A N G < / a >   | 
 |   D a t e   |   < a     h r e f = " # d a t e " > D A T E < / a > ,   < a     h r e f = " # d a t e a d d " > D A T E A D D < / a > ,   < a     h r e f = " # d a t e d i f " > D A T E D I F < / a > ,   < a     h r e f = " # d a t e v a l u e " > D A T E V A L U E < / a > ,   < a     h r e f = " # d a t e _ t o _ x l " > D A T E _ T O _ X L < / a > ,   < a     h r e f = " # d a y " > J O U R < / a > ,   < a     h r e f = " # d a y s " > J O U R S < / a > ,   < a     h r e f = " # d t i m e " > D T I M E < / a > ,   < a     h r e f = " # e d a t e " > E D A T E < / a > ,   < a     h r e f = " # e o m o n t h " > E O M O N T H < / a > ,   < a     h r e f = " # h o u r " > H E U R E < / a > ,   < a     h r e f = " # i s o w e e k n u m " > I S O W E E K N U M < / a > ,   < a     h r e f = " # m i n u t e " > M I N U T E < / a > ,   < a     h r e f = " # m o n t h " > M O I S < / a > ,   < a     h r e f = " # m o o n p h a s e " > P H A S E   D E   L A   L U N E < / a > ,   < a     h r e f = " # n o w " > M A I N T E N A N T < / a > ,   < a     h r e f = " # s e c o n d " > S E C O N D E < / a > ,   < a     h r e f = " # t o d a y " > A U J O U R D ' H U I < / a > ,   < a     h r e f = " # w e e k d a y " > J O U R   D E   L A   S E M A I N E < / a > ,   < a     h r e f = " # w e e k n u m " > N U M É R O   D E   S E M A I N E < / a > ,   < a     h r e f = " # x l _ t o _ d a t e " > X L _ T O _ D A T E < / a > ,   < a     h r e f = " # y e a r " > A N N É E < / a > ,   < a     h r e f = " # y e a r f r a c " > Y E A R F R A C < / a >   | 
 |   I n f o   |   < a   c l a s s = " u n i m p l e m e n t e d "   h r e f = " # c e l l " > C E L L U L E < / a > ,   < a   c l a s s = " u n i m p l e m e n t e d "   h r e f = " # i s b l a n k " > E S T V I D E < / a > ,   < a     h r e f = " # i s e m a i l " > I S E M A I L < / a > ,   < a     h r e f = " # i s e r r " > I S E R R < / a > ,   < a     h r e f = " # i s e r r o r " > I S E R R O R < / a > ,   < a     h r e f = " # i s l o g i c a l " > I S L O G I Q U E < / a > ,   < a     h r e f = " # i s n a " > I S N A < / a > ,   < a     h r e f = " # i s n o n t e x t " > I S N O N T E X T E < / a > ,   < a     h r e f = " # i s n u m b e r " > I S N U M É R I Q U E < / a > ,   < a     h r e f = " # i s r e f " > I S R E F < / a > ,   < a     h r e f = " # i s r e f l i s t " > I S R E F L I S T < / a > ,   < a     h r e f = " # i s t e x t " > I S T E X T E < / a > ,   < a     h r e f = " # i s u r l " > I S U R L < / a > ,   < a     h r e f = " # n " > N < / a > ,   < a     h r e f = " # n a " > N A < / a > ,   < a     h r e f = " # p e e k " > J E T E R   U N   C O U P   D ' Œ I L < / a > ,   < a     h r e f = " # r e c o r d _ 2 " > E N R E G I S T R E M E N T < / a > ,   < a   c l a s s = " u n i m p l e m e n t e d "   h r e f = " # r e q u e s t " > D E M A N D E < / a > ,   < a   c l a s s = " u n i m p l e m e n t e d "   h r e f = " # t y p e " > T Y P E < / a >   | 
 |   L o g i q u e   |   < a     h r e f = " # a n d " > E T < / a > ,   < a     h r e f = " # f a l s e " > F A U X < / a > ,   < a     h r e f = " # i f " > S I < / a > ,   < a     h r e f = " # i f e r r o r " > S I E R R E U R < / a > ,   < a     h r e f = " # n o t " > N O N < / a > ,   < a     h r e f = " # o r " > O U < / a > ,   < a     h r e f = " # t r u e " > V R A I < / a >   | 
 |   R e c h e r c h e   |   < a     h r e f = " # l o o k u p o n e _ 2 " > l o o k u p O n e < / a > ,   < a     h r e f = " # l o o k u p r e c o r d s _ 2 " > l o o k u p R e c o r d s < / a > ,   < a   c l a s s = " u n i m p l e m e n t e d "   h r e f = " # a d d r e s s " > A D R E S S E < / a > ,   < a   c l a s s = " u n i m p l e m e n t e d "   h r e f = " # c h o o s e " > C H O I S I R < / a > ,   < a   c l a s s = " u n i m p l e m e n t e d "   h r e f = " # c o l u m n " > C O L O N N E < / a > ,   < a   c l a s s = " u n i m p l e m e n t e d "   h r e f = " # c o l u m n s " > C O L O N N E S < / a > ,   < a     h r e f = " # c o n t a i n s " > C O N T I E N T < / a > ,   < a   c l a s s = " u n i m p l e m e n t e d "   h r e f = " # g e t p i v o t d a t a " > G E T P I V O T D A T A < / a > ,   < a   c l a s s = " u n i m p l e m e n t e d "   h r e f = " # h l o o k u p " > H L O O K U P < / a > ,   < a   c l a s s = " u n i m p l e m e n t e d "   h r e f = " # h y p e r l i n k " > H Y P E R L I E N < / a > ,   < a   c l a s s = " u n i m p l e m e n t e d "   h r e f = " # i n d e x " > I N D E X < / a > ,   < a   c l a s s = " u n i m p l e m e n t e d "   h r e f = " # i n d i r e c t " > I N D I R E C T < / a > ,   < a   c l a s s = " u n i m p l e m e n t e d "   h r e f = " # l o o k u p " > L O O K U P < / a > ,   < a   c l a s s = " u n i m p l e m e n t e d "   h r e f = " # m a t c h " > M A T C H < / a > ,   < a   c l a s s = " u n i m p l e m e n t e d "   h r e f = " # o f f s e t " > O F F S E T < / a > ,   < a   c l a s s = " u n i m p l e m e n t e d "   h r e f = " # r o w " > L I G N E < / a > ,   < a   c l a s s = " u n i m p l e m e n t e d "   h r e f = " # r o w s " > L I G N E S < / a > ,   < a     h r e f = " # s e l f _ h y p e r l i n k " > S E L F _ H Y P E R L I N K < / a > ,   < a     h r e f = " # v l o o k u p " > V L O O K U P < / a >   | 
 |   M a t h   |   < a     h r e f = " # a b s " > A B S < / a > ,   < a     h r e f = " # a c o s " > A C O S < / a > ,   < a     h r e f = " # a c o s h " > A C O S H < / a > ,   < a     h r e f = " # a r a b i c " > A R A B E < / a > ,   < a     h r e f = " # a s i n " > A S I N < / a > ,   < a     h r e f = " # a s i n h " > A S I N H < / a > ,   < a     h r e f = " # a t a n " > A T A N < / a > ,   < a     h r e f = " # a t a n 2 " > A T A N 2 < / a > ,   < a     h r e f = " # a t a n h " > A T A N H < / a > ,   < a     h r e f = " # c e i l i n g " > P L A F O N D < / a > ,   < a     h r e f = " # c o m b i n " > C O M B I N < / a > ,   < a     h r e f = " # c o s " > C O S < / a > ,   < a     h r e f = " # c o s h " > C O S H < / a > ,   < a     h r e f = " # d e g r e e s " > D E G R É S < / a > ,   < a     h r e f = " # e v e n " > P A I R < / a > ,   < a     h r e f = " # e x p " > E X P < / a > ,   < a     h r e f = " # f a c t " > F A C T < / a > ,   < a     h r e f = " # f a c t d o u b l e " > F A C T D O U B L E < / a > ,   < a     h r e f = " # f l o o r " > F L O O R < / a > ,   < a     h r e f = " # g c d " > P G C D < / a > ,   < a     h r e f = " # i n t " > E N T I E R < / a > ,   < a     h r e f = " # l c m " > P P C M < / a > ,   < a     h r e f = " # l n " > L N < / a > ,   < a     h r e f = " # l o g " > L O G < / a > ,   < a     h r e f = " # l o g 1 0 " > L O G 1 0 < / a > ,   < a     h r e f = " # m o d " > M O D < / a > ,   < a     h r e f = " # m r o u n d " > M R O U N D < / a > ,   < a     h r e f = " # m u l t i n o m i a l " > M U L T I N O M I A L < / a > ,   < a     h r e f = " # n u m " > N U M < / a > ,   < a     h r e f = " # o d d " > I M P A I R < / a > ,   < a     h r e f = " # p i " > P I < / a > ,   < a     h r e f = " # p o w e r " > P U I S S A N C E < / a > ,   < a     h r e f = " # p r o d u c t " > P R O D U I T < / a > ,   < a     h r e f = " # q u o t i e n t " > Q U O T I E N T < / a > ,   < a     h r e f = " # r a d i a n s " > R A D I A N S < / a > ,   < a     h r e f = " # r a n d " > R A N D < / a > ,   < a     h r e f = " # r a n d b e t w e e n " > R A N D B E T W E E N < / a > ,   < a     h r e f = " # r o m a n " > R O M A I N < / a > ,   < a     h r e f = " # r o u n d " > A R R O N D I < / a > ,   < a     h r e f = " # r o u n d d o w n " > A R R O N D I . I N F < / a > ,   < a     h r e f = " # r o u n d u p " > A R R O N D I . S U P < / a > ,   < a     h r e f = " # s e r i e s s u m " > S E R I E S S U M < / a > ,   < a     h r e f = " # s i g n " > S I G N < / a > ,   < a     h r e f = " # s i n " > S I N < / a > ,   < a     h r e f = " # s i n h " > S I N H < / a > ,   < a     h r e f = " # s q r t " > R A C I N E < / a > ,   < a     h r e f = " # s q r t p i " > R A C I N E P I < / a > ,   < a   c l a s s = " u n i m p l e m e n t e d "   h r e f = " # s u b t o t a l " > S O U S - T O T A L < / a > ,   < a     h r e f = " # s u m " > S O M M E < / a > ,   < a   c l a s s = " u n i m p l e m e n t e d "   h r e f = " # s u m i f " > S O M M E . S I < / a > ,   < a   c l a s s = " u n i m p l e m e n t e d "   h r e f = " # s u m i f s " > S O M M E . S I . E N S < / a > ,   < a     h r e f = " # s u m p r o d u c t " > S O M M E P R O D < / a > ,   < a   c l a s s = " u n i m p l e m e n t e d "   h r e f = " # s u m s q " > S O M M E S Q < / a > ,   < a     h r e f = " # t a n " > T A N < / a > ,   < a     h r e f = " # t a n h " > T A N H < / a > ,   < a     h r e f = " # t r u n c " > T R O N Q U E < / a > ,   < a     h r e f = " # u u i d " > U U I D < / a >   | 
 |   H o r a i r e   |   < a     h r e f = " # s c h e d u l e " > S C H E D U L E < / a >   | 
 |   S t a t i s t i q u e s   |   < a   c l a s s = " u n i m p l e m e n t e d "   h r e f = " # a v e d e v " > A V E D E V < / a > ,   < a     h r e f = " # a v e r a g e " > M O Y E N N E < / a > ,   < a     h r e f = " # a v e r a g e a " > M O Y E N N E A < / a > ,   < a   c l a s s = " u n i m p l e m e n t e d "   h r e f = " # a v e r a g e i f " > M O Y E N N E . S I < / a > ,   < a   c l a s s = " u n i m p l e m e n t e d "   h r e f = " # a v e r a g e i f s " > M O Y E N N E . S I . E N S < / a > ,   < a     h r e f = " # a v e r a g e _ w e i g h t e d " > M O Y E N N E _ P O N D É R É E < / a > ,   < a   c l a s s = " u n i m p l e m e n t e d "   h r e f = " # b i n o m d i s t " > B I N O M D I S T < / a > ,   < a   c l a s s = " u n i m p l e m e n t e d "   h r e f = " # c o n f i d e n c e " > C O N F I A N C E < / a > ,   < a   c l a s s = " u n i m p l e m e n t e d "   h r e f = " # c o r r e l " > C O R R E L < / a > ,   < a     h r e f = " # c o u n t " > C O M P T E < / a > ,   < a     h r e f = " # c o u n t a " > C O M P T E A < / a > ,   < a   c l a s s = " u n i m p l e m e n t e d "   h r e f = " # c o v a r " > C O V A R < / a > ,   < a   c l a s s = " u n i m p l e m e n t e d "   h r e f = " # c r i t b i n o m " > C R I T B I N O M < / a > ,   < a   c l a s s = " u n i m p l e m e n t e d "   h r e f = " # d e v s q " > D E V S Q < / a > ,   < a   c l a s s = " u n i m p l e m e n t e d "   h r e f = " # e x p o n d i s t " > E X P O N D I S T < / a > ,   < a   c l a s s = " u n i m p l e m e n t e d "   h r e f = " # f d i s t " > F D I S T < / a > ,   < a   c l a s s = " u n i m p l e m e n t e d "   h r e f = " # f i s h e r " > F I S H E R < / a > ,   < a   c l a s s = " u n i m p l e m e n t e d "   h r e f = " # f i s h e r i n v " > F I S H E R I N V < / a > ,   < a   c l a s s = " u n i m p l e m e n t e d "   h r e f = " # f o r e c a s t " > P R É V O I R < / a > ,   < a   c l a s s = " u n i m p l e m e n t e d "   h r e f = " # f _ d i s t " > F _ D I S T < / a > ,   < a   c l a s s = " u n i m p l e m e n t e d "   h r e f = " # f _ d i s t _ r t " > F _ D I S T _ R T < / a > ,   < a   c l a s s = " u n i m p l e m e n t e d "   h r e f = " # g e o m e a n " > G E O M E A N < / a > ,   < a   c l a s s = " u n i m p l e m e n t e d "   h r e f = " # h a r m e a n " > H A R M E A N < / a > ,   < a   c l a s s = " u n i m p l e m e n t e d "   h r e f = " # h y p g e o m d i s t " > H Y P G E O M D I S T < / a > ,   < a   c l a s s = " u n i m p l e m e n t e d "   h r e f = " # i n t e r c e p t " > I N T E R C E P T < / a > ,   < a   c l a s s = " u n i m p l e m e n t e d "   h r e f = " # k u r t " > K U R T < / a > ,   < a   c l a s s = " u n i m p l e m e n t e d "   h r e f = " # l a r g e " > G R A N D < / a > ,   < a   c l a s s = " u n i m p l e m e n t e d "   h r e f = " # l o g i n v " > L O G I N V < / a > ,   < a   c l a s s = " u n i m p l e m e n t e d "   h r e f = " # l o g n o r m d i s t " > L O G N O R M D I S T < / a > ,   < a     h r e f = " # m a x " > M A X < / a > ,   < a     h r e f = " # m a x a " > M A X A < / a > ,   < a     h r e f = " # m e d i a n " > M É D I A N E < / a > ,   < a     h r e f = " # m i n " > M I N < / a > ,   < a     h r e f = " # m i n a " > M I N A < / a > ,   < a   c l a s s = " u n i m p l e m e n t e d "   h r e f = " # m o d e " > M O D E < / a > ,   < a   c l a s s = " u n i m p l e m e n t e d "   h r e f = " # n e g b i n o m d i s t " > N E G B I N O M D I S T < / a > ,   < a   c l a s s = " u n i m p l e m e n t e d "   h r e f = " # n o r m d i s t " > N O R M D I S T < / a > ,   < a   c l a s s = " u n i m p l e m e n t e d "   h r e f = " # n o r m i n v " > N O R M I N V < / a > ,   < a   c l a s s = " u n i m p l e m e n t e d "   h r e f = " # n o r m s d i s t " > N O R M S D I S T < / a > ,   < a   c l a s s = " u n i m p l e m e n t e d "   h r e f = " # n o r m s i n v " > N O R M S I N V < / a > ,   < a   c l a s s = " u n i m p l e m e n t e d "   h r e f = " # p e a r s o n " > P E A R S O N < / a > ,   < a   c l a s s = " u n i m p l e m e n t e d "   h r e f = " # p e r c e n t i l e " > P E R C E N T I L E < / a > ,   < a   c l a s s = " u n i m p l e m e n t e d "   h r e f = " # p e r c e n t r a n k " > P E R C E N T R A N K < / a > ,   < a   c l a s s = " u n i m p l e m e n t e d "   h r e f = " # p e r c e n t r a n k _ e x c " > P E R C E N T R A N K _ E X C < / a > ,   < a   c l a s s = " u n i m p l e m e n t e d "   h r e f = " # p e r c e n t r a n k _ i n c " > P E R C E N T R A N K _ I N C < / a > ,   < a   c l a s s = " u n i m p l e m e n t e d "   h r e f = " # p e r m u t " > P E R M U T < / a > ,   < a   c l a s s = " u n i m p l e m e n t e d "   h r e f = " # p o i s s o n " > P O I S S O N < / a > ,   < a   c l a s s = " u n i m p l e m e n t e d "   h r e f = " # p r o b " > P R O B < / a > ,   < a   c l a s s = " u n i m p l e m e n t e d "   h r e f = " # q u a r t i l e " > Q U A R T I L E < / a > ,   < a   c l a s s = " u n i m p l e m e n t e d "   h r e f = " # r a n k _ a v g " > R A N G _ M O Y < / a > ,   < a   c l a s s = " u n i m p l e m e n t e d "   h r e f = " # r a n k _ e q " > R A N G _ E Q < / a > ,   < a   c l a s s = " u n i m p l e m e n t e d "   h r e f = " # r s q " > R S Q < / a > ,   < a   c l a s s = " u n i m p l e m e n t e d "   h r e f = " # s k e w " > S K E W < / a > ,   < a   c l a s s = " u n i m p l e m e n t e d "   h r e f = " # s l o p e " > P E N T E < / a > ,   < a   c l a s s = " u n i m p l e m e n t e d "   h r e f = " # s m a l l " > P E T I T < / a > ,   < a   c l a s s = " u n i m p l e m e n t e d "   h r e f = " # s t a n d a r d i z e " > S T A N D A R D I S E R < / a > ,   < a     h r e f = " # s t d e v " > É C A R T _ T Y P E < / a > ,   < a     h r e f = " # s t d e v a " > É C A R T _ T Y P E A < / a > ,   < a     h r e f = " # s t d e v p " > É C A R T _ T Y P E P < / a > ,   < a     h r e f = " # s t d e v p a " > É C A R T _ T Y P E P A < / a > ,   < a   c l a s s = " u n i m p l e m e n t e d "   h r e f = " # s t e y x " > S T E Y X < / a > ,   < a   c l a s s = " u n i m p l e m e n t e d "   h r e f = " # t d i s t " > T D I S T < / a > ,   < a   c l a s s = " u n i m p l e m e n t e d "   h r e f = " # t i n v " > T I N V < / a > ,   < a   c l a s s = " u n i m p l e m e n t e d "   h r e f = " # t r i m m e a n " > T R I M M E A N < / a > ,   < a   c l a s s = " u n i m p l e m e n t e d "   h r e f = " # t t e s t " > T T E S T < / a > ,   < a   c l a s s = " u n i m p l e m e n t e d "   h r e f = " # t _ i n v " > T _ I N V < / a > ,   < a   c l a s s = " u n i m p l e m e n t e d "   h r e f = " # t _ i n v _ 2 t " > T _ I N V _ 2 T < / a > ,   < a   c l a s s = " u n i m p l e m e n t e d "   h r e f = " # v a r " > V A R < / a > ,   < a   c l a s s = " u n i m p l e m e n t e d "   h r e f = " # v a r a " > V A R A < / a > ,   < a   c l a s s = " u n i m p l e m e n t e d "   h r e f = " # v a r p " > V A R P < / a > ,   < a   c l a s s = " u n i m p l e m e n t e d "   h r e f = " # v a r p a " > V A R P A < / a > ,   < a   c l a s s = " u n i m p l e m e n t e d "   h r e f = " # w e i b u l l " > W E I B U L L < / a > ,   < a   c l a s s = " u n i m p l e m e n t e d "   h r e f = " # z t e s t " > Z T E S T < / a >   | 
 |   T e x t e   |   < a     h r e f = " # c h a r " > C A R A C T È R E < / a > ,   < a     h r e f = " # c l e a n " > N E T T O Y E R < / a > ,   < a     h r e f = " # c o d e " > C O D E < / a > ,   < a     h r e f = " # c o n c a t " > C O N C A T < / a > ,   < a     h r e f = " # c o n c a t e n a t e " > C O N C A T É N E R < / a > ,   < a     h r e f = " # d o l l a r " > D O L L A R < / a > ,   < a     h r e f = " # e x a c t " > E X A C T < / a > ,   < a     h r e f = " # f i n d " > T R O U V E R < / a > ,   < a     h r e f = " # f i x e d " > F I X E < / a > ,   < a     h r e f = " # l e f t " > G A U C H E < / a > ,   < a     h r e f = " # l e n " > L O N G U E U R < / a > ,   < a     h r e f = " # l o w e r " > M I N U S C U L E < / a > ,   < a     h r e f = " # m i d " > M I L I E U < / a > ,   < a     h r e f = " # p h o n e _ f o r m a t " > F O R M A T _ T É L É P H O N E < / a > ,   < a     h r e f = " # p r o p e r " > P R O P R E < / a > ,   < a     h r e f = " # r e g e x e x t r a c t " > R E G E X E X T R A C T < / a > ,   < a     h r e f = " # r e g e x m a t c h " > R E G E X M A T C H < / a > ,   < a     h r e f = " # r e g e x r e p l a c e " > R E G E X R E P L A C E < / a > ,   < a     h r e f = " # r e p l a c e " > R E M P L A C E R < / a > ,   < a     h r e f = " # r e p t " > R É P É T E R < / a > ,   < a     h r e f = " # r i g h t " > D R O I T E < / a > ,   < a     h r e f = " # s e a r c h " > R E C H E R C H E R < / a > ,   < a     h r e f = " # s u b s t i t u t e " > S U B S T I T U E R < / a > ,   < a     h r e f = " # t " > T < / a > ,   < a     h r e f = " # t a s t e m e " > T A S T E M E < / a > ,   < a   c l a s s = " u n i m p l e m e n t e d "   h r e f = " # t e x t " > T E X T E < / a > ,   < a     h r e f = " # t r i m " > T R I M < / a > ,   < a     h r e f = " # u p p e r " > M A J U S C U L E < / a > ,   < a     h r e f = " # v a l u e " > V A L E U R < / a >   | 
 < ! - -   E N D   m k p y d o c s   t a b l e   - - > 
 
 < ! - -   B E G I N   m k p y d o c s   d o c s   - - > 
 # # #   G r i s t 
 < d e t a i l s   i d = " r e c o r d " > < s u m m a r y   > 
 # # # #   E n r e g i s t r e m e n t 
 < c o d e > c l a s s   _ _ R e c o r d _ _ < / c o d e > 
 < a   c l a s s = " h e a d e r l i n k "   h r e f = " # r e c o r d "   t i t l e = " L i e n   p e r m a n e n t " > # < / a > 
 < / s u m m a r y > 
 U n   E n r e g i s t r e m e n t   r e p r é s e n t e   u n   e n r e g i s t r e m e n t   d e   d o n n é e s .   C ' e s t   l e   m o y e n   p r i n c i p a l   d ' a c c è s   a u x   v a l e u r s   d a n s   l e s   f o r m u l e s .   U n 
 E n r e g i s t r e m e n t   p o u r   u n e   t a b l e   p a r t i c u l i è r e   a   u n e   p r o p r i é t é   p o u r   c h a q u e   c o l o n n e   d e   d o n n é e s   e t   d e   f o r m u l e   d a n s   l a   t a b l e . 
 
 D a n s   u n e   f o r m u l e ,   ` $ f i e l d `   e s t   t r a d u i t   p a r   ` r e c . f i e l d ` ,   o ù   ` r e c `   e s t   l ' E n r e g i s t r e m e n t   p o u r   l e q u e l   l a 
 f o r m u l e   e s t   é v a l u é e . 
 
 P a r   e x e m p l e   : 
 ` ` ` 
 d e f   N o m _ C o m p l e t ( r e c ,   t a b l e ) : 
     r e t u r n   r e c . P r é n o m   +   '   '   +   r e c . N o m D e F a m i l l e 
 
 d e f   L o n g u e u r _ N o m ( r e c ,   t a b l e ) : 
     r e t u r n   l e n ( r e c . N o m _ C o m p l e t ) 
 ` ` ` 
 < / d e t a i l s > 
 < d e t a i l s   i d = " _ f i e l d " > < s u m m a r y   > 
 # # # #   $ C h a m p 
 < c o d e > _ _ $ _ _ * C h a m p *   o u   _ _ r e c _ _ * . C h a m p * < / c o d e > 
 < a   c l a s s = " h e a d e r l i n k "   h r e f = " # _ f i e l d "   t i t l e = " L i e n   p e r m a n e n t " > # < / a > 
 < / s u m m a r y > 
 A c c è d e   a u   c h a m p   n o m m é   " C h a m p "   d e   l ' e n r e g i s t r e m e n t   a c t u e l .   P a r   e x e m p l e ,   ` $ P r é n o m `   o u   ` r e c . P r é n o m ` . 
 < / d e t a i l s > 
 < d e t a i l s   i d = " _ g r o u p " > < s u m m a r y   > 
 # # # #   $ g r o u p e 
 < c o d e > _ _ $ g r o u p e _ _ < / c o d e > 
 < a   c l a s s = " h e a d e r l i n k "   h r e f = " # _ g r o u p "   t i t l e = " L i e n   p e r m a n e n t " > # < / a > 
 < / s u m m a r y > 
 D a n s   u n e   [ t a b l e   d e   r é s u m é ] ( s u m m a r y - t a b l e s . m d ) ,   ` $ g r o u p e `   e s t   u n   c h a m p   s p é c i a l 
 c o n t e n a n t   l a   l i s t e   d e s   E n r e g i s t r e m e n t s   q u i   s o n t   r é s u m é s   p a r   l a   l i g n e   d e   r é s u m é   a c t u e l l e .   P a r   e x e m p l e ,   l a 
 f o r m u l e   ` l e n ( $ g r o u p e ) `   c o m p t e   l e   n o m b r e   d e   c e s   e n r e g i s t r e m e n t s   é t a n t   r é s u m é s   d a n s   c h a q u e   l i g n e . 
 
 V o i r   [ E n s e m b l e   d ' E n r e g i s t r e m e n t s ] ( # r e c o r d s e t )   p o u r   l e s   p r o p r i é t é s   u t i l e s   o f f e r t e s   p a r   l ' o b j e t   r e t o u r n é . 
 
 E x e m p l e s   : 
 ` ` ` 
 s u m ( $ g r o u p e . M o n t a n t )                                                 #   S o m m e   d u   c h a m p   M o n t a n t   d a n s   l e s   e n r e g i s t r e m e n t s   c o r r e s p o n d a n t s 
 s u m ( r . M o n t a n t   f o r   r   i n   $ g r o u p e )                           #   M ê m e   q u e   s u m ( $ g r o u p e . M o n t a n t ) 
 s u m ( r . M o n t a n t   f o r   r   i n   $ g r o u p e   i f   r   >   0 )         #   S o m m e   u n i q u e m e n t   d e s   m o n t a n t s   p o s i t i f s 
 s u m ( r . A c t i o n s   *   r . P r i x   f o r   r   i n   $ g r o u p e )       #   S o m m e   d e s   p r o d u i t s   a c t i o n s   *   p r i x 
 ` ` ` 
 < / d e t a i l s > 
 < d e t a i l s   i d = " r e c o r d s e t " > < s u m m a r y   > 
 # # # #   E n s e m b l e   d ' E n r e g i s t r e m e n t s 
 < c o d e > c l a s s   _ _ R e c o r d S e t _ _ < / c o d e > 
 < a   c l a s s = " h e a d e r l i n k "   h r e f = " # r e c o r d s e t "   t i t l e = " L i e n   p e r m a n e n t " > # < / a > 
 < / s u m m a r y > 
 U n   E n s e m b l e   d ' E n r e g i s t r e m e n t s   r e p r é s e n t e   u n e   c o l l e c t i o n   d ' e n r e g i s t r e m e n t s ,   c o m m e   r e t o u r n é   p a r   ` T a b l e . l o o k u p R e c o r d s ( ) `   o u 
 l a   p r o p r i é t é   ` $ g r o u p e `   d a n s   l e s   v u e s   d e   r é s u m é . 
 
 U n   E n s e m b l e   d ' E n r e g i s t r e m e n t s   p e r m e t   d ' i t é r e r   à   t r a v e r s   l e s   e n r e g i s t r e m e n t s   : 
 ` ` ` 
 s u m ( r . M o n t a n t   f o r   r   i n   É t u d i a n t s . l o o k u p R e c o r d s ( P r é n o m = " J o h n " ,   N o m D e F a m i l l e = " D o e " ) ) 
 m i n ( r . D a t e E c h é a n c e   f o r   r   i n   T â c h e s . l o o k u p R e c o r d s ( P r o p r i é t a i r e = " B o b " ) ) 
 ` ` ` 
 
 L e s   E n s e m b l e s   d ' E n r e g i s t r e m e n t s   f o u r n i s s e n t   é g a l e m e n t   u n   m o y e n   p r a t i q u e   d ' a c c é d e r   à   l a   l i s t e   d e s   v a l e u r s   p o u r   u n   c h a m p   p a r t i c u l i e r   p o u r 
 t o u s   l e s   e n r e g i s t r e m e n t s ,   c o m m e   ` r e c o r d _ s e t . C h a m p ` .   P a r   e x e m p l e ,   l e s   e x e m p l e s   c i - d e s s u s   s o n t   é q u i v a l e n t s   à   : 
 ` ` ` 
 s u m ( É t u d i a n t s . l o o k u p R e c o r d s ( P r é n o m = " J o h n " ,   N o m D e F a m i l l e = " D o e " ) . M o n t a n t ) 
 m i n ( T â c h e s . l o o k u p R e c o r d s ( P r o p r i é t a i r e = " B o b " ) . D a t e E c h é a n c e ) 
 ` ` ` 
 
 V o u s   p o u v e z   o b t e n i r   l e   n o m b r e   d ' e n r e g i s t r e m e n t s   d a n s   u n   E n s e m b l e   d ' E n r e g i s t r e m e n t s   e n   u t i l i s a n t   ` l e n ` ,   p a r   e x e m p l e   ` l e n ( $ g r o u p e ) ` . 
 < / d e t a i l s > 
 < d e t a i l s   i d = " f i n d _ " > < s u m m a r y   > 
 # # # #   f i n d . * 
 < c o d e > R e c o r d S e t . * * f i n d . \ * * * ( v a l u e ) < / c o d e > 
 < a   c l a s s = " h e a d e r l i n k "   h r e f = " # f i n d _ "   t i t l e = " L i e n   p e r m a n e n t " > # < / a > 
 < / s u m m a r y > 
 U n   e n s e m b l e   d e   m é t h o d e s   p o u r   t r o u v e r   d e s   v a l e u r s   d a n s   d e s   e n s e m b l e s   t r i é s   d ' e n r e g i s t r e m e n t s ,   c o m m e   r e t o u r n é   p a r 
 [ ` l o o k u p R e c o r d s ` ] ( # l o o k u p r e c o r d s ) .   P a r   e x e m p l e   : 
 ` ` ` 
 T r a n s a c t i o n s . l o o k u p R e c o r d s ( . . . ,   o r d e r _ b y = " D a t e " ) . f i n d . l t ( $ D a t e ) 
 T a b l e . l o o k u p R e c o r d s ( . . . ,   o r d e r _ b y = ( " F o o " ,   " B a r " ) ) . f i n d . l e ( f o o ,   b a r ) 
 ` ` ` 
 
 S i   l ' a t t r i b u t   ` f i n d `   e s t   m a s q u é   p a r   u n e   c o l o n n e   d ' u t i l i s a t e u r   d u   m ê m e   n o m ,   v o u s   p o u v e z   u t i l i s e r   ` _ f i n d `   à   l a   p l a c e . 
 
 L e s   m é t h o d e s   d i s p o n i b l e s   s o n t   : 
 
 -   _ _ ` l t ` _ _ :   ( m o i n s   q u e )   t r o u v e   l ' e n r e g i s t r e m e n t   l e   p l u s   p r o c h e   a v e c   d e s   v a l e u r s   d e   t r i   <   l e s   v a l e u r s   d o n n é e s 
 -   _ _ ` l e ` _ _ :   ( m o i n s   q u e   o u   é g a l   à )   t r o u v e   l ' e n r e g i s t r e m e n t   l e   p l u s   p r o c h e   a v e c   d e s   v a l e u r s   d e   t r i   < =   l e s   v a l e u r s   d o n n é e s 
 -   _ _ ` g t ` _ _ :   ( p l u s   g r a n d   q u e )   t r o u v e   l ' e n r e g i s t r e m e n t   l e   p l u s   p r o c h e   a v e c   d e s   v a l e u r s   d e   t r i   >   l e s   v a l e u r s   d o n n é e s 
 -   _ _ ` g e ` _ _ :   ( p l u s   g r a n d   o u   é g a l   à )   t r o u v e   l ' e n r e g i s t r e m e n t   l e   p l u s   p r o c h e   a v e c   d e s   v a l e u r s   d e   t r i   > =   l e s   v a l e u r s   d o n n é e s 
 -   _ _ ` e q ` _ _ :   ( é g a l   à )   t r o u v e   l ' e n r e g i s t r e m e n t   l e   p l u s   p r o c h e   a v e c   d e s   v a l e u r s   d e   t r i   = =   l e s   v a l e u r s   d o n n é e s 
 
 E x e m p l e   d e   [ n o t r e   m o d è l e   d e   P a i e ] ( h t t p s : / / t e m p l a t e s . g e t g r i s t . c o m / 5 p H L a n Q N T h x k / P a y r o l l ) . 
 C h a q u e   p e r s o n n e   a   u n   h i s t o r i q u e   d e s   t a u x   d e   r é m u n é r a t i o n ,   d a n s   l a   t a b l e   d e s   T a u x .   P o u r   t r o u v e r   u n   t a u x   a p p l i c a b l e   à   u n e 
 d a t e   d o n n é e ,   v o i c i   c o m m e n t   v o u s   p o u v e z   l e   f a i r e   à   l ' a n c i e n n e   : 
 ` ` ` p y t h o n 
 #   O b t e n e z   t o u s   l e s   t a u x   p o u r   l a   P e r s o n n e   e t   l e   R ô l e   d a n s   c e t t e   l i g n e . 
 t a u x   =   T a u x . l o o k u p R e c o r d s ( P e r s o n = $ P e r s o n ,   R ô l e = $ R ô l e ) 
 
 #   S é l e c t i o n n e z   u n i q u e m e n t   l e s   t a u x   d o n t   l e   D é b u t _ T a u x   e s t   à   o u   a v a n t   l a   D a t e   d e   c e t t e   l i g n e . 
 t a u x _ p a s s é s   =   [ r   f o r   r   i n   t a u x   i f   r . D é b u t _ T a u x   < =   $ D a t e ] 
 
 #   S é l e c t i o n n e z   l e   d e r n i e r   d e s   t a u x _ p a s s é s ,   c ' e s t - à - d i r e   l e   m a x i m u m   p a r   D é b u t _ T a u x . 
 t a u x   =   m a x ( t a u x _ p a s s é s ,   k e y = l a m b d a   r :   r . D é b u t _ T a u x ) 
 
 #   R e t o u r n e z   l e   T a u x _ H o r a i r e   d u   t a u x   p e r t i n e n t . 
 r e t u r n   t a u x . T a u x _ H o r a i r e 
 ` ` ` 
 
 A v e c   l e s   n o u v e l l e s   m é t h o d e s ,   c ' e s t   b e a u c o u p   p l u s   s i m p l e   : 
 ` ` ` p y t h o n 
 t a u x   =   T a u x . l o o k u p R e c o r d s ( P e r s o n = $ P e r s o n ,   R ô l e = $ R ô l e ,   o r d e r _ b y = " D é b u t _ T a u x " ) 
 t a u x   =   t a u x . f i n d . l e ( $ D a t e ) 
 r e t u r n   t a u x . T a u x _ H o r a i r e 
 ` ` ` 
 
 N o t e z   q u e   c e l a   e s t   é g a l e m e n t   b e a u c o u p   p l u s   r a p i d e   l o r s q u ' i l   y   a   d e   n o m b r e u x   t a u x   p o u r   l a   m ê m e   P e r s o n n e   e t   l e   m ê m e   R ô l e . 
 < / d e t a i l s > 
 < d e t a i l s   i d = " u s e r t a b l e " > < s u m m a r y   > 
 # # # #   T a b l e   d ' U t i l i s a t e u r s 
 < c o d e > c l a s s   _ _ U s e r T a b l e _ _ < / c o d e > 
 < a   c l a s s = " h e a d e r l i n k "   h r e f = " # u s e r t a b l e "   t i t l e = " L i e n   p e r m a n e n t " > # < / a > 
 < / s u m m a r y > 
 C h a q u e   t a b l e   d e   d o n n é e s   d a n s   l e   d o c u m e n t   e s t   r e p r é s e n t é e   d a n s   l e   c o d e   p a r   u n e   i n s t a n c e   d e   l a   c l a s s e   ` U s e r T a b l e ` . 
 C e s   n o m s   s o n t   t o u j o u r s   e n   m a j u s c u l e s .   U n e   U s e r T a b l e   f o u r n i t   u n   a c c è s   à   t o u s   l e s   e n r e g i s t r e m e n t s   d a n s   l a   t a b l e , 
 a i n s i   q u e   d e s   m é t h o d e s   p o u r   r e c h e r c h e r   d e s   e n r e g i s t r e m e n t s   p a r t i c u l i e r s . 
 
 C h a q u e   t a b l e   d a n s   l e   d o c u m e n t   e s t   d i s p o n i b l e   p o u r   t o u t e s   l e s   f o r m u l e s . 
 < / d e t a i l s > 
 < d e t a i l s   i d = " a l l " > < s u m m a r y   > 
 # # # #   t o u s 
 < c o d e > U s e r T a b l e . _ _ a l l _ _ < / c o d e > 
 < a   c l a s s = " h e a d e r l i n k "   h r e f = " # a l l "   t i t l e = " L i e n   p e r m a n e n t " > # < / a > 
 < / s u m m a r y > 
 L a   l i s t e   d e   t o u s   l e s   e n r e g i s t r e m e n t s   d a n s   c e t t e   t a b l e . 
 
 P a r   e x e m p l e ,   c e l a   é v a l u e   l e   n o m b r e   d ' e n r e g i s t r e m e n t s   d a n s   l a   t a b l e   ` É t u d i a n t s ` . 
 ` ` ` 
 l e n ( É t u d i a n t s . a l l ) 
 ` ` ` 
 
 C e l a   é v a l u e   à   l a   s o m m e   d u   c h a m p   ` P o p u l a t i o n `   p o u r   c h a q u e   e n r e g i s t r e m e n t   d a n s   l a   t a b l e   ` P a y s ` . 
 ` ` ` 
 s u m ( r . P o p u l a t i o n   f o r   r   i n   P a y s . a l l ) 
 ` ` ` 
 < / d e t a i l s > 
 < d e t a i l s   i d = " l o o k u p o n e " > < s u m m a r y   > 
 # # # #   l o o k u p O n e 
 < c o d e > U s e r T a b l e . _ _ l o o k u p O n e _ _ ( C h a m p _ D a n s _ T a b l e _ D _ A p p a i r a g e = v a l u e ,   . . . ) < / c o d e > 
 < a   c l a s s = " h e a d e r l i n k "   h r e f = " # l o o k u p o n e "   t i t l e = " L i e n   p e r m a n e n t " > # < / a > 
 < / s u m m a r y > 
 R e t o u r n e   u n   [ E n r e g i s t r e m e n t ] ( # r e c o r d )   c o r r e s p o n d a n t   a u x   a r g u m e n t s   f i e l d = v a l u e   d o n n é s .   L a   v a l e u r   p e u t   ê t r e   n ' i m p o r t e   q u e l l e 
 e x p r e s s i o n , 
 l e   p l u s   s o u v e n t   u n   c h a m p   d a n s   l a   l i g n e   a c t u e l l e   ( p a r   e x e m p l e ,   ` $ C e r t a i n s C h a m p s ` )   o u   u n e   c o n s t a n t e   ( p a r   e x e m p l e ,   u n e   c h a î n e   d e   c a r a c t è r e s   e n t r e   g u i l l e m e t s 
 c o m m e   ` " U n e   V a l e u r " ` ) . 
 
 P a r   e x e m p l e   : 
 ` ` ` 
 P e r s o n n e s . l o o k u p O n e ( P r é n o m = " L e w i s " ,   N o m D e F a m i l l e = " C a r r o l l " ) 
 P e r s o n n e s . l o o k u p O n e ( E m a i l = $ E m a i l _ T r a v a i l ) 
 ` ` ` 
 
 E n   s a v o i r   p l u s   s u r   [ l o o k u p O n e ] ( r e f e r e n c e s - l o o k u p s . m d # l o o k u p o n e ) . 
 
 S i   p l u s i e u r s   e n r e g i s t r e m e n t s   s o n t   t r o u v é s ,   l a   p r e m i è r e   c o r r e s p o n d a n c e   e s t   r e t o u r n é e .   V o u s   p o u v e z   d é f i n i r   l e   p a r a m è t r e   o p t i o n n e l   ` o r d e r _ b y ` 
 a u   I D   d e   c o l o n n e   p a r   l e q u e l   t r i e r   l e s   c o r r e s p o n d a n c e s ,   p o u r   d é t e r m i n e r   l a q u e l l e   d ' e n t r e   e l l e s   e s t 
 r e t o u r n é e   e n   p r e m i e r .   P a r   d é f a u t ,   l ' e n r e g i s t r e m e n t   a v e c   l e   p l u s   p e t i t   I D   d e   l i g n e   e s t   r e t o u r n é . 
 
 V o i r   [ ` l o o k u p R e c o r d s ` ] ( # l o o k u p r e c o r d s )   p o u r   l e s   d é t a i l s   d e   t o u t e s   l e s   o p t i o n s   d i s p o n i b l e s   e t   l e   c o m p o r t e m e n t   d e 
 ` o r d e r _ b y `   ( e t   d e   s o n   a l t e r n a t i v e   h é r i t é e ,   ` s o r t _ b y ` ) . 
 
 P a r   e x e m p l e   : 
 ` ` ` 
 T â c h e s . l o o k u p O n e ( P r o j e t = $ i d ,   o r d e r _ b y = " P r i o r i t é " )     #   T â c h e   a v e c   l a   p l u s   p e t i t e   P r i o r i t é . 
 T a u x . l o o k u p O n e ( P e r s o n n e = $ i d ,   o r d e r _ b y = " - D a t e " )             #   T a u x   a v e c   l a   d e r n i è r e   D a t e . 
 ` ` ` 
 < / d e t a i l s > 
 < d e t a i l s   i d = " l o o k u p r e c o r d s " > < s u m m a r y   > 
 # # # #   l o o k u p R e c o r d s 
 < c o d e > U s e r T a b l e . _ _ l o o k u p R e c o r d s _ _ ( C h a m p _ D a n s _ T a b l e _ D _ A p p a i r a g e = v a l u e ,   . . . ) < / c o d e > 
 < a   c l a s s = " h e a d e r l i n k "   h r e f = " # l o o k u p r e c o r d s "   t i t l e = " L i e n   p e r m a n e n t " > # < / a > 
 < / s u m m a r y > 
 R e t o u r n e   u n   [ E n s e m b l e   d ' E n r e g i s t r e m e n t s ] ( # r e c o r d s e t )   c o r r e s p o n d a n t   a u x   a r g u m e n t s   f i e l d = v a l u e   d o n n é s .   L a   v a l e u r   p e u t   ê t r e 
 n ' i m p o r t e   q u e l l e   e x p r e s s i o n , 
 l e   p l u s   s o u v e n t   u n   c h a m p   d a n s   l a   l i g n e   a c t u e l l e   ( p a r   e x e m p l e ,   ` $ C e r t a i n s C h a m p s ` )   o u   u n e   c o n s t a n t e   ( p a r   e x e m p l e ,   u n e   c h a î n e   d e   c a r a c t è r e s   e n t r e   g u i l l e m e t s 
 c o m m e   ` " U n e   V a l e u r " ` )   ( e x e m p l e s   c i - d e s s o u s ) . 
 
 P a r   e x e m p l e   : 
 ` ` ` 
 P e r s o n n e s . l o o k u p R e c o r d s ( E m a i l = $ E m a i l _ T r a v a i l ) 
 P e r s o n n e s . l o o k u p R e c o r d s ( P r é n o m = " G e o r g e " ,   N o m D e F a m i l l e = " W a s h i n g t o n " ) 
 ` ` ` 
 
 V o u s   p o u v e z   d é f i n i r   l e   p a r a m è t r e   o p t i o n n e l   ` o r d e r _ b y `   a u   I D   d e   c o l o n n e   p a r   l e q u e l   t r i e r   l e s   r é s u l t a t s . 
 V o u s   p o u v e z   p r é f i x e r   l ' I D   d e   c o l o n n e   a v e c   " - "   p o u r   i n v e r s e r   l ' o r d r e .   V o u s   p o u v e z   é g a l e m e n t   s p é c i f i e r   p l u s i e u r s 
 I D s   d e   c o l o n n e s   s o u s   f o r m e   d e   t u p l e   ( p a r   e x e m p l e ,   ` o r d e r _ b y = ( " C o m p t e " ,   " - D a t e " ) ` ) . 
 
 P a r   e x e m p l e   : 
 ` ` ` 
 T r a n s a c t i o n s . l o o k u p R e c o r d s ( C o m p t e = $ C o m p t e ,   o r d e r _ b y = " D a t e " ) 
 T r a n s a c t i o n s . l o o k u p R e c o r d s ( C o m p t e = $ C o m p t e ,   o r d e r _ b y = " - D a t e " ) 
 T r a n s a c t i o n s . l o o k u p R e c o r d s ( A c t i f = T r u e ,   o r d e r _ b y = ( " C o m p t e " ,   " - D a t e " ) ) 
 ` ` ` 
 
 P o u r   l e s   e n r e g i s t r e m e n t s   a v e c   d e s   c h a m p s   ` o r d e r _ b y `   é g a u x ,   l e s   r é s u l t a t s   s o n t   t r i é s   s e l o n   l e u r   a p p a r e n c e 
 d a n s   l e s   v u e s   ( c e   q u i   e s t   d é t e r m i n é   p a r   l a   c o l o n n e   s p é c i a l e   ` m a n u a l S o r t ` ) .   V o u s   p o u v e z   d é f i n i r   ` o r d e r _ b y = N o n e ` 
 p o u r   c o r r e s p o n d r e   à   l ' o r d r e   d e s   e n r e g i s t r e m e n t s   d a n s   l e s   v u e s   n o n   t r i é e s . 
 
 P a r   d é f a u t ,   s a n s   ` o r d e r _ b y ` ,   l e s   e n r e g i s t r e m e n t s   s o n t   t r i é s   p a r   I D   d e   l i g n e ,   c o m m e   s i   a v e c   ` o r d e r _ b y = " i d " ` . 
 
 P o u r   d e s   r a i s o n s   d e   c o m p a t i b i l i t é ,   ` s o r t _ b y `   p e u t   ê t r e   u t i l i s é   à   l a   p l a c e   d e   ` o r d e r _ b y ` ,   m a i s   n e   p e r m e t   q u ' u n 
 s e u l   c h a m p ,   e t   r e v i e n t   à   l ' I D   d e   l i g n e   ( p l u t ô t   q u ' à   ` m a n u a l S o r t ` ) . 
 
 V o i r   [ E n s e m b l e   d ' E n r e g i s t r e m e n t s ] ( # r e c o r d s e t )   p o u r   l e s   p r o p r i é t é s   u t i l e s   o f f e r t e s   p a r   l ' o b j e t   r e t o u r n é .   E n 
 p a r t i c u l i e r ,   d e s   m é t h o d e s   c o m m e   [ ` . f i n d . l e ` ] ( # f i n d _ )   p e r m e t t e n t   d e   r e c h e r c h e r   d e s   v a l e u r s   l e s   p l u s   p r o c h e s . 
 
 V o i r   [ C O N T I E N T ] ( # c o n t a i n s )   p o u r   u n   e x e m p l e   u t i l i s a n t   ` U s e r T a b l e . l o o k u p R e c o r d s `   p o u r   t r o u v e r   d e s   e n r e g i s t r e m e n t s 
 o ù   u n   c h a m p   d e   t y p e   l i s t e   ( t e l   q u ' u n e   ` L i s t e   d e   C h o i x `   o u   u n e   ` L i s t e   d e   R é f é r e n c e s ` )   c o n t i e n t   l a   v a l e u r   d o n n é e . 
 
 E n   s a v o i r   p l u s   s u r   [ l o o k u p R e c o r d s ] ( r e f e r e n c e s - l o o k u p s . m d # l o o k u p r e c o r d s ) . 
 < / d e t a i l s > 
 # # #   C u m u l a t i f 
 < d e t a i l s   i d = " n e x t " > < s u m m a r y   > 
 # # # #   S U I V A N T 
 < c o d e > _ _ N E X T _ _ ( r e c ,   * ,   g r o u p _ b y = ( ) ,   o r d e r _ b y ) < / c o d e > 
 < a   c l a s s = " h e a d e r l i n k "   h r e f = " # n e x t "   t i t l e = " L i e n   p e r m a n e n t " > # < / a > 
 < / s u m m a r y > 
 T r o u v e   l ' e n r e g i s t r e m e n t   s u i v a n t   d a n s   l a   t a b l e   s e l o n   l ' o r d r e   s p é c i f i é   p a r   ` o r d e r _ b y ` ,   e t 
 l e   r e g r o u p e m e n t   s p é c i f i é   p a r   ` g r o u p _ b y ` .   V o i r   [ ` P R É C É D E N T ` ] ( # p r e v i o u s )   p o u r   p l u s   d e   d é t a i l s . 
 < / d e t a i l s > 
 < d e t a i l s   i d = " p r e v i o u s " > < s u m m a r y   > 
 # # # #   P R É C É D E N T 
 < c o d e > _ _ P R E V I O U S _ _ ( r e c ,   * ,   g r o u p _ b y = ( ) ,   o r d e r _ b y ) < / c o d e > 
 < a   c l a s s = " h e a d e r l i n k "   h r e f = " # p r e v i o u s "   t i t l e = " L i e n   p e r m a n e n t " > # < / a > 
 < / s u m m a r y > 
 T r o u v e   l ' e n r e g i s t r e m e n t   p r é c é d e n t   d a n s   l a   t a b l e   s e l o n   l ' o r d r e   s p é c i f i é   p a r   ` o r d e r _ b y ` ,   e t 
 l e   r e g r o u p e m e n t   s p é c i f i é   p a r   ` g r o u p _ b y ` .   C h a c u n   d e   c e s   a r g u m e n t s   p e u t   ê t r e   u n   I D   d e   c o l o n n e   o u   u n   t u p l e   d e 
 I D s   d e   c o l o n n e s ,   e t   ` o r d e r _ b y `   p e r m e t   a u x   I D s   d e   c o l o n n e s   d ' ê t r e   p r é f i x é s   p a r   " - "   p o u r   i n v e r s e r   l ' o r d r e   d e   t r i . 
 
 P a r   e x e m p l e , 
 ` ` ` p y t h o n 
 P R É C É D E N T ( r e c ,   o r d e r _ b y = " D a t e " )         #   L ' e n r e g i s t r e m e n t   p r é c é d e n t   l o r s q u ' i l   e s t   t r i é   p a r   D a t e   c r o i s s a n t e . 
 P R É C É D E N T ( r e c ,   o r d e r _ b y = " - D a t e " )       #   L ' e n r e g i s t r e m e n t   p r é c é d e n t   l o r s q u ' i l   e s t   t r i é   p a r   D a t e   d é c r o i s s a n t e . 
 ` ` ` 
 
 V o u s   p o u v e z   u t i l i s e r   ` g r o u p _ b y `   p o u r   r e c h e r c h e r   l ' e n r e g i s t r e m e n t   p r é c é d e n t   d a n s   u n   g r o u p e   f i l t r é .   P a r   e x e m p l e , 
 c e l a   t r o u v e   l ' e n r e g i s t r e m e n t   p r é c é d e n t   a v e c   l e   m ê m e   C o m p t e   q u e   ` r e c ` ,   l o r s q u e   l e s   e n r e g i s t r e m e n t s   s o n t   f i l t r é s   p a r   l e 
 C o m p t e   d e   ` r e c `   e t   t r i é s   p a r   D a t e   c r o i s s a n t e   : 
 ` ` ` p y t h o n 
 P R É C É D E N T ( r e c ,   g r o u p _ b y = " C o m p t e " ,   o r d e r _ b y = " D a t e " ) 
 ` ` ` 
 
 L o r s q u e   p l u s i e u r s   e n r e g i s t r e m e n t s   o n t   l e s   m ê m e s   v a l e u r s   ` o r d e r _ b y `   ( p a r   e x e m p l e ,   l a   m ê m e   D a t e   d a n s   l e s   e x e m p l e s   c i - d e s s u s ) , 
 l ' o r d r e   e s t   d é t e r m i n é   p a r   l a   p o s i t i o n   r e l a t i v e   d e s   l i g n e s   d a n s   l e s   v u e s .   C e l a   s e   f a i t   e n   i n t e r n e   e n 
 r e v e n a n t   à   l a   c o l o n n e   s p é c i a l e   ` m a n u a l S o r t `   e t   à   l a   c o l o n n e   I D   d e   l i g n e   ` i d ` . 
 
 U t i l i s e z   ` o r d e r _ b y = N o n e `   p o u r   t r o u v e r   l ' e n r e g i s t r e m e n t   p r é c é d e n t   d a n s   u n e   t a b l e   n o n   t r i é e   ( l o r s q u e   l e s   l i g n e s   p e u v e n t   ê t r e 
 r é o r g a n i s é e s   e n   l e s   f a i s a n t   g l i s s e r   m a n u e l l e m e n t ) .   P a r   e x e m p l e   : 
 ` ` ` p y t h o n 
 P R É C É D E N T ( r e c ,   o r d e r _ b y = N o n e )             #   L ' e n r e g i s t r e m e n t   p r é c é d e n t   d a n s   l a   l i s t e   n o n   t r i é e   d e s   e n r e g i s t r e m e n t s . 
 ` ` ` 
 
 V o u s   p o u v e z   s p é c i f i e r   p l u s i e u r s   I D s   d e   c o l o n n e s   s o u s   f o r m e   d e   t u p l e ,   p o u r   ` g r o u p _ b y `   e t   ` o r d e r _ b y ` .   C e l a   p e u t   ê t r e 
 u t i l i s é   p o u r   c o r r e s p o n d r e   a u x   v u e s   t r i é e s   p a r   p l u s i e u r s   c o l o n n e s .   P a r   e x e m p l e   : 
 ` ` ` p y t h o n 
 P R É C É D E N T ( r e c ,   g r o u p _ b y = ( " C o m p t e " ,   " A n n é e " ) ,   o r d e r _ b y = ( " D a t e " ,   " - M o n t a n t " ) ) 
 ` ` ` 
 < / d e t a i l s > 
 < d e t a i l s   i d = " r a n k " > < s u m m a r y   > 
 # # # #   R A N G 
 < c o d e > _ _ R A N K _ _ ( r e c ,   * ,   g r o u p _ b y = ( ) ,   o r d e r _ b y ,   o r d e r = ' a s c ' ) < / c o d e > 
 < a   c l a s s = " h e a d e r l i n k "   h r e f = " # r a n k "   t i t l e = " L i e n   p e r m a n e n t " > # < / a > 
 < / s u m m a r y > 
 R e t o u r n e   l e   r a n g   ( o u   l a   p o s i t i o n )   d e   c e t   e n r e g i s t r e m e n t   d a n s   l a   t a b l e   s e l o n   l ' o r d r e   s p é c i f i é   p a r 
 ` o r d e r _ b y ` ,   e t   l e   r e g r o u p e m e n t   s p é c i f i é   p a r   ` g r o u p _ b y ` .   V o i r   [ ` P R É C É D E N T ` ] ( # p r e v i o u s )   p o u r   l e s   d é t a i l s   d e 
 c e s   p a r a m è t r e s . 
 
 L e   p a r a m è t r e   ` o r d e r `   p e u t   ê t r e   ` " a s c " `   ( q u i   e s t   l a   v a l e u r   p a r   d é f a u t )   o u   ` " d e s c " ` . 
 
 L o r s q u e   ` o r d e r `   e s t   ` " a s c " `   o u   o m i s ,   l e   p r e m i e r   e n r e g i s t r e m e n t   d u   g r o u p e   d a n s   l ' o r d r e   t r i é   a u r a i t 
 l e   r a n g   d e   1 .   L o r s q u e   ` o r d e r `   e s t   ` " d e s c " ` ,   l e   d e r n i e r   e n r e g i s t r e m e n t   d a n s   l ' o r d r e   t r i é   a u r a i t   l e   r a n g 
 d e   1 . 
 
 S ' i l   y   a   p l u s i e u r s   g r o u p e s ,   i l   y   a u r a   p l u s i e u r s   e n r e g i s t r e m e n t s   a v e c   l e   m ê m e   r a n g .   E n   p a r t i c u l i e r , 
 c h a q u e   g r o u p e   a u r a   u n   e n r e g i s t r e m e n t   a v e c   l e   r a n g   1 . 
 
 P a r   e x e m p l e ,   ` R A N G ( r e c ,   g r o u p _ b y = " A n n é e " ,   o r d e r _ b y = " S c o r e " ,   o r d e r = " d e s c " ) `   r e t o u r n e r a   l e   r a n g   d e 
 l ' e n r e g i s t r e m e n t   a c t u e l   ( ` r e c ` )   p a r m i   t o u s   l e s   e n r e g i s t r e m e n t s   d e   s a   t a b l e   p o u r   l a   m ê m e   a n n é e ,   o r d o n n é   p a r 
 s c o r e   d é c r o i s s a n t . 
 < / d e t a i l s > 
 # # #   D a t e 
 < d e t a i l s   i d = " d a t e " > < s u m m a r y   > 
 # # # #   D A T E 
 < c o d e > _ _ D A T E _ _ ( a n n é e ,   m o i s ,   j o u r ) < / c o d e > 
 < a   c l a s s = " h e a d e r l i n k "   h r e f = " # d a t e "   t i t l e = " L i e n   p e r m a n e n t " > # < / a > 
 < / s u m m a r y > 
 R e t o u r n e   l ' o b j e t   ` d a t e t i m e . d a t e t i m e `   q u i   r e p r é s e n t e   u n e   d a t e   p a r t i c u l i è r e . 
 L a   f o n c t i o n   D A T E   e s t   l a   p l u s   u t i l e   d a n s   l e s   f o r m u l e s   o ù   l ' a n n é e ,   l e   m o i s   e t   l e   j o u r   s o n t   d e s   f o r m u l e s ,   p a s 
 d e s   c o n s t a n t e s . 
 
 S i   l ' a n n é e   e s t   c o m p r i s e   e n t r e   0   e t   1 8 9 9   ( i n c l u s ) ,   a j o u t e   1 9 0 0   p o u r   c a l c u l e r   l ' a n n é e . 
 
 ` ` ` p y t h o n 
 > > >   D A T E ( 1 0 8 ,   1 ,   2 ) 
 d a t e t i m e . d a t e ( 2 0 0 8 ,   1 ,   2 ) 
 ` ` ` 
 
 ` ` ` p y t h o n 
 > > >   D A T E ( 2 0 0 8 ,   1 ,   2 ) 
 d a t e t i m e . d a t e ( 2 0 0 8 ,   1 ,   2 ) 
 ` ` ` 
 
 S i   l e   m o i s   e s t   s u p é r i e u r   à   1 2 ,   c e l a   p a s s e   à   l ' a n n é e   s u i v a n t e . 
 
 ` ` ` p y t h o n 
 > > >   D A T E ( 2 0 0 8 ,   1 4 ,   2 ) 
 d a t e t i m e . d a t e ( 2 0 0 9 ,   2 ,   2 ) 
 ` ` ` 
 
 S i   l e   m o i s   e s t   i n f é r i e u r   à   1 ,   c e l a   s o u s t r a i t   c e   n o m b r e   d e   m o i s   p l u s   1 ,   d u   p r e m i e r   m o i s   d e   l ' a n n é e . 
 
 ` ` ` p y t h o n 
 > > >   D A T E ( 2 0 0 8 ,   - 3 ,   2 ) 
 d a t e t i m e . d a t e ( 2 0 0 7 ,   9 ,   2 ) 
 ` ` ` 
 
 S i   l e   j o u r   e s t   s u p é r i e u r   a u   n o m b r e   d e   j o u r s   d a n s   l e   m o i s   d o n n é ,   c e l a   p a s s e   a u x   m o i s   s u i v a n t s . 
 
 ` ` ` p y t h o n 
 > > >   D A T E ( 2 0 0 8 ,   1 ,   3 5 ) 
 d a t e t i m e . d a t e ( 2 0 0 8 ,   2 ,   4 ) 
 ` ` ` 
 
 S i   l e   j o u r   e s t   i n f é r i e u r   à   1 ,   c e l a   s o u s t r a i t   c e   n o m b r e   d e   j o u r s   p l u s   1 ,   d u   p r e m i e r   j o u r   d u   m o i s   d o n n é . 
 
 ` ` ` p y t h o n 
 > > >   D A T E ( 2 0 0 8 ,   1 ,   - 1 5 ) 
 d a t e t i m e . d a t e ( 2 0 0 7 ,   1 2 ,   1 6 ) 
 ` ` ` 
 < / d e t a i l s > 
 < d e t a i l s   i d = " d a t e a d d " > < s u m m a r y   > 
 # # # #   D A T E A D D 
 < c o d e > _ _ D A T E A D D _ _ ( d a t e _ d é b u t ,   j o u r s = 0 ,   m o i s = 0 ,   a n n é e s = 0 ,   s e m a i n e s = 0 ) < / c o d e > 
 < a   c l a s s = " h e a d e r l i n k "   h r e f = " # d a t e a d d "   t i t l e = " L i e n   p e r m a n e n t " > # < / a > 
 < / s u m m a r y > 
 R e t o u r n e   l a   d a t e   d ' u n   n o m b r e   d o n n é   d e   j o u r s ,   m o i s ,   a n n é e s   o u   s e m a i n e s   à   p a r t i r   d e   ` d a t e _ d é b u t ` .   V o u s   p o u v e z 
 s p é c i f i e r   l e s   a r g u m e n t s   d a n s   n ' i m p o r t e   q u e l   o r d r e   s i   v o u s   s p é c i f i e z   l e s   n o m s   d e s   a r g u m e n t s .   U t i l i s e z   d e s   v a l e u r s   n é g a t i v e s   p o u r   s o u s t r a i r e . 
 
 P a r   e x e m p l e ,   ` D A T E A D D ( d a t e ,   1 ) `   e s t   i d e n t i q u e   à   ` D A T E A D D ( d a t e ,   j o u r s = 1 ) ` ,   e t   a j o u t e   u n   j o u r   à 
 ` d a t e ` .   ` D A T E A D D ( d a t e ,   a n n é e s = 1 ,   j o u r s = - 1 ) `   a j o u t e   u n   a n   m o i n s   u n   j o u r . 
 
 ` ` ` p y t h o n 
 > > >   D A T E A D D ( D A T E ( 2 0 1 1 ,   1 ,   1 5 ) ,   1 ) 
 d a t e t i m e . d a t e ( 2 0 1 1 ,   1 ,   1 6 ) 
 ` ` ` 
 
 ` ` ` p y t h o n 
 > > >   D A T E A D D ( D A T E ( 2 0 1 1 ,   1 ,   1 5 ) ,   m o i s = 1 ,   j o u r s = - 1 ) 
 d a t e t i m e . d a t e ( 2 0 1 1 ,   2 ,   1 4 ) 
 ` ` ` 
 
 ` ` ` p y t h o n 
 > > >   D A T E A D D ( D A T E ( 2 0 1 1 ,   1 ,   1 5 ) ,   a n n é e s = - 2 ,   m o i s = 1 ,   j o u r s = 3 ,   s e m a i n e s = 2 ) 
 d a t e t i m e . d a t e ( 2 0 0 9 ,   3 ,   4 ) 
 ` ` ` 
 
 ` ` ` p y t h o n 
 > > >   D A T E A D D ( D A T E ( 1 9 7 5 ,   4 ,   3 0 ) ,   a n n é e s = 5 0 ,   s e m a i n e s = - 5 ) 
 d a t e t i m e . d a t e ( 2 0 2 5 ,   3 ,   2 6 ) 
 ` ` ` 
 
 < / d e t a i l s > 
 < d e t a i l s   i d = " d a t e d i f " > < s u m m a r y   > 
 # # # #   D A T E D I F 
 < c o d e > _ _ D A T E D I F _ _ ( d a t e _ d é b u t ,   d a t e _ f i n ,   u n i t é ) < / c o d e > 
 < a   c l a s s = " h e a d e r l i n k "   h r e f = " # d a t e d i f "   t i t l e = " L i e n   p e r m a n e n t " > # < / a > 
 < / s u m m a r y > 
 C a l c u l e   l e   n o m b r e   d e   j o u r s ,   m o i s   o u   a n n é e s   e n t r e   d e u x   d a t e s . 
 L ' u n i t é   i n d i q u e   l e   t y p e   d ' i n f o r m a t i o n   q u e   v o u s   s o u h a i t e z   r e t o u r n e r   : 
 
     -   " Y "   :   L e   n o m b r e   d ' a n n é e s   c o m p l è t e s   d a n s   l a   p é r i o d e . 
     -   " M "   :   L e   n o m b r e   d e   m o i s   c o m p l e t s   d a n s   l a   p é r i o d e . 
     -   " D "   :   L e   n o m b r e   d e   j o u r s   d a n s   l a   p é r i o d e . 
     -   " M D "   :   L a   d i f f é r e n c e   e n t r e   l e s   j o u r s   d a n s   d a t e _ d é b u t   e t   d a t e _ f i n .   L e s   m o i s   e t   a n n é e s   d e s 
         d a t e s   s o n t   i g n o r é s . 
     -   " Y M "   :   L a   d i f f é r e n c e   e n t r e   l e s   m o i s   d a n s   d a t e _ d é b u t   e t   d a t e _ f i n .   L e s   j o u r s   e t   a n n é e s   d e s 
         d a t e s   s o n t   i g n o r é s . 
     -   " Y D "   :   L a   d i f f é r e n c e   e n t r e   l e s   j o u r s   d e   d a t e _ d é b u t   e t   d a t e _ f i n .   L e s   a n n é e s   d e s   d a t e s   s o n t 
         i g n o r é e s . 
 
 D e u x   a n n é e s   c o m p l è t e s   d a n s   l a   p é r i o d e   ( 2 ) 
 
 ` ` ` p y t h o n 
 > > >   D A T E D I F ( D A T E ( 2 0 0 1 ,   1 ,   1 ) ,   D A T E ( 2 0 0 3 ,   1 ,   1 ) ,   " Y " ) 
 2 
 ` ` ` 
 
 4 4 0   j o u r s   e n t r e   l e   1 e r   j u i n   2 0 0 1   e t   l e   1 5   a o û t   2 0 0 2   ( 4 4 0 ) 
 
 ` ` ` p y t h o n 
 > > >   D A T E D I F ( D A T E ( 2 0 0 1 ,   6 ,   1 ) ,   D A T E ( 2 0 0 2 ,   8 ,   1 5 ) ,   " D " ) 
 4 4 0 
 ` ` ` 
 
 7 5   j o u r s   e n t r e   l e   1 e r   j u i n   e t   l e   1 5   a o û t ,   e n   i g n o r a n t   l e s   a n n é e s   d e s   d a t e s   ( 7 5 ) 
 
 ` ` ` p y t h o n 
 > > >   D A T E D I F ( D A T E ( 2 0 0 1 ,   6 ,   1 ) ,   D A T E ( 2 0 1 2 ,   8 ,   1 5 ) ,   " Y D " ) 
 7 5 
 ` ` ` 
 
 L a   d i f f é r e n c e   e n t r e   1   e t   1 5 ,   e n   i g n o r a n t   l e s   m o i s   e t   l e s   a n n é e s   d e s   d a t e s   ( 1 4 ) 
 
 ` ` ` p y t h o n 
 > > >   D A T E D I F ( D A T E ( 2 0 0 1 ,   6 ,   1 ) ,   D A T E ( 2 0 0 2 ,   8 ,   1 5 ) ,   " M D " ) 
 1 4 
 ` ` ` 
 < / d e t a i l s > 
 < d e t a i l s   i d = " d a t e v a l u e " > < s u m m a r y   > 
 # # # #   D A T E V A L U E 
 < c o d e > _ _ D A T E V A L U E _ _ ( d a t e _ s t r i n g ,   t z = N o n e ) < / c o d e > 
 < a   c l a s s = " h e a d e r l i n k "   h r e f = " # d a t e v a l u e "   t i t l e = " L i e n   p e r m a n e n t " > # < / a > 
 < / s u m m a r y > 
 C o n v e r t i t   u n e   d a t e   s t o c k é e   s o u s   f o r m e   d e   t e x t e   e n   u n   o b j e t   ` d a t e t i m e ` . 
 
 
 ` ` ` p y t h o n 
 > > >   D A T E V A L U E ( " 1 / 1 / 2 0 0 8 " ) 
 d a t e t i m e . d a t e t i m e ( 2 0 0 8 ,   1 ,   1 ,   0 ,   0 ,   t z i n f o = m o m e n t . t z i n f o ( ' A m e r i c a / N e w _ Y o r k ' ) ) 
 ` ` ` 
 
 ` ` ` p y t h o n 
 > > >   D A T E V A L U E ( " 3 0 - J a n - 2 0 0 8 " ) 
 d a t e t i m e . d a t e t i m e ( 2 0 0 8 ,   1 ,   3 0 ,   0 ,   0 ,   t z i n f o = m o m e n t . t z i n f o ( ' A m e r i c a / N e w _ Y o r k ' ) ) 
 ` ` ` 
 
 ` ` ` p y t h o n 
 > > >   D A T E V A L U E ( " 2 0 0 8 - 1 2 - 1 1 " ) 
 d a t e t i m e . d a t e t i m e ( 2 0 0 8 ,   1 2 ,   1 1 ,   0 ,   0 ,   t z i n f o = m o m e n t . t z i n f o ( ' A m e r i c a / N e w _ Y o r k ' ) ) 
 ` ` ` 
 
 ` ` ` p y t h o n 
 > > >   D A T E V A L U E ( " 5 - J U L " ) . r e p l a c e ( y e a r = 2 0 0 0 ) 
 d a t e t i m e . d a t e t i m e ( 2 0 0 0 ,   7 ,   5 ,   0 ,   0 ,   t z i n f o = m o m e n t . t z i n f o ( ' A m e r i c a / N e w _ Y o r k ' ) ) 
 ` ` ` 
 
 E n   c a s   d ' a m b i g u ï t é ,   p r é f é r e z   l e   f o r m a t   M / J / A . 
 
 ` ` ` p y t h o n 
 > > >   D A T E V A L U E ( " 1 / 2 / 3 " ) 
 d a t e t i m e . d a t e t i m e ( 2 0 0 3 ,   1 ,   2 ,   0 ,   0 ,   t z i n f o = m o m e n t . t z i n f o ( ' A m e r i c a / N e w _ Y o r k ' ) ) 
 ` ` ` 
 < / d e t a i l s > 
 < d e t a i l s   i d = " d a t e _ t o _ x l " > < s u m m a r y   > 
 # # # #   D A T E _ T O _ X L 
 < c o d e > _ _ D A T E _ T O _ X L _ _ ( v a l e u r _ d a t e ) < / c o d e > 
 < a   c l a s s = " h e a d e r l i n k "   h r e f = " # d a t e _ t o _ x l "   t i t l e = " L i e n   p e r m a n e n t " > # < / a > 
 < / s u m m a r y > 
 C o n v e r t i t   u n   o b j e t   ` d a t e `   o u   ` d a t e t i m e `   P y t h o n   e n   l e   n u m é r o   d e   s é r i e   u t i l i s é   p a r 
 E x c e l ,   a v e c   l e   3 0   d é c e m b r e   1 8 9 9   c o m m e   n u m é r o   d e   s é r i e   1 . 
 
 V o i r   X L _ T O _ D A T E   p o u r   p l u s   d ' e x p l i c a t i o n s . 
 
 
 ` ` ` p y t h o n 
 > > >   D A T E _ T O _ X L ( d a t e t i m e . d a t e ( 2 0 0 8 ,   1 ,   1 ) ) 
 3 9 4 4 8 . 0 
 ` ` ` 
 
 ` ` ` p y t h o n 
 > > >   D A T E _ T O _ X L ( d a t e t i m e . d a t e ( 2 0 1 2 ,   3 ,   1 4 ) ) 
 4 0 9 8 2 . 0 
 ` ` ` 
 
 ` ` ` p y t h o n 
 > > >   D A T E _ T O _ X L ( d a t e t i m e . d a t e t i m e ( 2 0 1 2 ,   3 ,   1 4 ,   1 ,   3 0 ) ) 
 4 0 9 8 2 . 0 6 2 5 
 ` ` ` 
 < / d e t a i l s > 
 < d e t a i l s   i d = " d a y " > < s u m m a r y   > 
 # # # #   J O U R 
 < c o d e > _ _ D A Y _ _ ( d a t e ) < / c o d e > 
 < a   c l a s s = " h e a d e r l i n k "   h r e f = " # d a y "   t i t l e = " L i e n   p e r m a n e n t " > # < / a > 
 < / s u m m a r y > 
 R e t o u r n e   l e   j o u r   d ' u n e   d a t e ,   s o u s   f o r m e   d ' e n t i e r   a l l a n t   d e   1   à   3 1 .   I d e n t i q u e   à   ` d a t e . d a y ` . 
 
 
 ` ` ` p y t h o n 
 > > >   D A Y ( D A T E ( 2 0 1 1 ,   4 ,   1 5 ) ) 
 1 5 
 ` ` ` 
 
 ` ` ` p y t h o n 
 > > >   D A Y ( " 5 / 3 1 / 2 0 1 2 " ) 
 3 1 
 ` ` ` 
 
 ` ` ` p y t h o n 
 > > >   D A Y ( d a t e t i m e . d a t e t i m e ( 1 9 0 0 ,   1 ,   1 ) ) 
 1 
 ` ` ` 
 
 < / d e t a i l s > 
 < d e t a i l s   i d = " d a y s " > < s u m m a r y   > 
 # # # #   J O U R S 
 < c o d e > _ _ D A Y S _ _ ( d a t e _ f i n ,   d a t e _ d é b u t ) < / c o d e > 
 < a   c l a s s = " h e a d e r l i n k "   h r e f = " # d a y s "   t i t l e = " L i e n   p e r m a n e n t " > # < / a > 
 < / s u m m a r y > 
 R e t o u r n e   l e   n o m b r e   d e   j o u r s   e n t r e   d e u x   d a t e s .   I d e n t i q u e   à   ` ( d a t e _ f i n   -   d a t e _ d é b u t ) . d a y s ` . 
 
 
 ` ` ` p y t h o n 
 > > >   D A Y S ( " 3 / 1 5 / 1 1 " , " 2 / 1 / 1 1 " ) 
 4 2 
 ` ` ` 
 
 ` ` ` p y t h o n 
 > > >   D A Y S ( D A T E ( 2 0 1 1 ,   1 2 ,   3 1 ) ,   D A T E ( 2 0 1 1 ,   1 ,   1 ) ) 
 3 6 4 
 ` ` ` 
 
 ` ` ` p y t h o n 
 > > >   D A Y S ( " 2 / 1 / 1 1 " ,   " 3 / 1 5 / 1 1 " ) 
 - 4 2 
 ` ` ` 
 
 < / d e t a i l s > 
 < d e t a i l s   i d = " d t i m e " > < s u m m a r y   > 
 # # # #   D T I M E 
 < c o d e > _ _ D T I M E _ _ ( v a l e u r ,   t z = N o n e ) < / c o d e > 
 < a   c l a s s = " h e a d e r l i n k "   h r e f = " # d t i m e "   t i t l e = " L i e n   p e r m a n e n t " > # < / a > 
 < / s u m m a r y > 
 R e t o u r n e   l a   v a l e u r   c o n v e r t i e   e n   u n   o b j e t   ` d a t e t i m e `   P y t h o n .   L a   v a l e u r   p e u t   ê t r e   u n e 
 ` c h a î n e ` ,   ` d a t e `   ( i n t e r p r é t é e   c o m m e   m i n u i t   c e   j o u r - l à ) ,   ` h e u r e `   ( i n t e r p r é t é e   c o m m e   u n e 
 h e u r e   d e   l a   j o u r n é e   a u j o u r d ' h u i ) ,   o u   u n   ` d a t e t i m e `   e x i s t a n t . 
 
 L e   ` d a t e t i m e `   r e t o u r n é   a u r a   s o n   f u s e a u   h o r a i r e   d é f i n i   s u r   l ' a r g u m e n t   ` t z ` ,   o u   l e   f u s e a u   h o r a i r e   p a r   d é f a u t   d u   d o c u m e n t   l o r s q u e   ` t z `   e s t   o m i s   o u   N o n e .   S i   l ' e n t r é e   e s t   e l l e - m ê m e   u n 
 ` d a t e t i m e `   a v e c   l e   f u s e a u   h o r a i r e   d é f i n i ,   i l   e s t   r e t o u r n é   s a n s   c h a n g e m e n t   ( s a n s   m o d i f i c a t i o n s   d e   s o n   f u s e a u   h o r a i r e ) . 
 
 
 ` ` ` p y t h o n 
 > > >   D T I M E ( d a t e t i m e . d a t e ( 2 0 1 7 ,   1 ,   1 ) ) 
 d a t e t i m e . d a t e t i m e ( 2 0 1 7 ,   1 ,   1 ,   0 ,   0 ,   t z i n f o = m o m e n t . t z i n f o ( ' A m e r i c a / N e w _ Y o r k ' ) ) 
 ` ` ` 
 
 ` ` ` p y t h o n 
 > > >   D T I M E ( d a t e t i m e . d a t e ( 2 0 1 7 ,   1 ,   1 ) ,   ' E u r o p e / P a r i s ' ) 
 d a t e t i m e . d a t e t i m e ( 2 0 1 7 ,   1 ,   1 ,   0 ,   0 ,   t z i n f o = m o m e n t . t z i n f o ( ' E u r o p e / P a r i s ' ) ) 
 ` ` ` 
 
 ` ` ` p y t h o n 
 > > >   D T I M E ( d a t e t i m e . d a t e t i m e ( 2 0 1 7 ,   1 ,   1 ) ) 
 d a t e t i m e . d a t e t i m e ( 2 0 1 7 ,   1 ,   1 ,   0 ,   0 ,   t z i n f o = m o m e n t . t z i n f o ( ' A m e r i c a / N e w _ Y o r k ' ) ) 
 ` ` ` 
 
 ` ` ` p y t h o n 
 > > >   D T I M E ( d a t e t i m e . d a t e t i m e ( 2 0 1 7 ,   1 ,   1 ,   t z i n f o = m o m e n t . t z i n f o ( ' U T C ' ) ) ) 
 d a t e t i m e . d a t e t i m e ( 2 0 1 7 ,   1 ,   1 ,   0 ,   0 ,   t z i n f o = m o m e n t . t z i n f o ( ' U T C ' ) ) 
 ` ` ` 
 
 ` ` ` p y t h o n 
 > > >   D T I M E ( d a t e t i m e . d a t e t i m e ( 2 0 1 7 ,   1 ,   1 ,   t z i n f o = m o m e n t . t z i n f o ( ' U T C ' ) ) ,   ' E u r o p e / P a r i s ' ) 
 d a t e t i m e . d a t e t i m e ( 2 0 1 7 ,   1 ,   1 ,   0 ,   0 ,   t z i n f o = m o m e n t . t z i n f o ( ' U T C ' ) ) 
 ` ` ` 
 
 ` ` ` p y t h o n 
 > > >   D T I M E ( " 1 / 1 / 2 0 0 8 " ) 
 d a t e t i m e . d a t e t i m e ( 2 0 0 8 ,   1 ,   1 ,   0 ,   0 ,   t z i n f o = m o m e n t . t z i n f o ( ' A m e r i c a / N e w _ Y o r k ' ) ) 
 ` ` ` 
 
 < / d e t a i l s > 
 < d e t a i l s   i d = " e d a t e " > < s u m m a r y   > 
 # # # #   E D A T E 
 < c o d e > _ _ E D A T E _ _ ( d a t e _ d é b u t ,   m o i s ) < / c o d e > 
 < a   c l a s s = " h e a d e r l i n k "   h r e f = " # e d a t e "   t i t l e = " L i e n   p e r m a n e n t " > # < / a > 
 < / s u m m a r y > 
 R e t o u r n e   l a   d a t e   q u i   e s t   l e   n o m b r e   d o n n é   d e   m o i s   a v a n t   o u   a p r è s   ` d a t e _ d é b u t ` .   U t i l i s e z 
 E D A T E   p o u r   c a l c u l e r   l e s   d a t e s   d ' é c h é a n c e   o u   d ' é c h é a n c e   q u i   t o m b e n t   l e   m ê m e   j o u r   d u   m o i s   q u e   l a 
 d a t e   d ' é m i s s i o n . 
 
 
 ` ` ` p y t h o n 
 > > >   E D A T E ( D A T E ( 2 0 1 1 ,   1 ,   1 5 ) ,   1 ) 
 d a t e t i m e . d a t e ( 2 0 1 1 ,   2 ,   1 5 ) 
 ` ` ` 
 
 ` ` ` p y t h o n 
 > > >   E D A T E ( D A T E ( 2 0 1 1 ,   1 ,   1 5 ) ,   - 1 ) 
 d a t e t i m e . d a t e ( 2 0 1 0 ,   1 2 ,   1 5 ) 
 ` ` ` 
 
 ` ` ` p y t h o n 
 > > >   E D A T E ( D A T E ( 2 0 1 1 ,   1 ,   1 5 ) ,   2 ) 
 d a t e t i m e . d a t e ( 2 0 1 1 ,   3 ,   1 5 ) 
 ` ` ` 
 
 ` ` ` p y t h o n 
 > > >   E D A T E ( D A T E ( 2 0 1 2 ,   3 ,   1 ) ,   1 0 ) 
 d a t e t i m e . d a t e ( 2 0 1 3 ,   1 ,   1 ) 
 ` ` ` 
 
 ` ` ` p y t h o n 
 > > >   E D A T E ( D A T E ( 2 0 1 2 ,   5 ,   1 ) ,   - 2 ) 
 d a t e t i m e . d a t e ( 2 0 1 2 ,   3 ,   1 ) 
 ` ` ` 
 
 < / d e t a i l s > 
 < d e t a i l s   i d = " e o m o n t h " > < s u m m a r y   > 
 # # # #   E O M O N T H 
 < c o d e > _ _ E O M O N T H _ _ ( d a t e _ d é b u t ,   m o i s ) < / c o d e > 
 < a   c l a s s = " h e a d e r l i n k "   h r e f = " # e o m o n t h "   t i t l e = " L i e n   p e r m a n e n t " > # < / a > 
 < / s u m m a r y > 
 R e t o u r n e   l a   d a t e   d u   d e r n i e r   j o u r   d u   m o i s   q u i   e s t   l e   n o m b r e   i n d i q u é   d e   m o i s   a v a n t   o u 
 a p r è s   d a t e _ d é b u t .   U t i l i s e z   E O M O N T H   p o u r   c a l c u l e r   l e s   d a t e s   d ' é c h é a n c e   o u   d ' é c h é a n c e   q u i   t o m b e n t   l e   d e r n i e r   j o u r 
 d u   m o i s . 
 
 
 ` ` ` p y t h o n 
 > > >   E O M O N T H ( D A T E ( 2 0 1 1 ,   1 ,   1 ) ,   1 ) 
 d a t e t i m e . d a t e ( 2 0 1 1 ,   2 ,   2 8 ) 
 ` ` ` 
 
 ` ` ` p y t h o n 
 > > >   E O M O N T H ( D A T E ( 2 0 1 1 ,   1 ,   1 5 ) ,   - 3 ) 
 d a t e t i m e . d a t e ( 2 0 1 0 ,   1 0 ,   3 1 ) 
 ` ` ` 
 
 ` ` ` p y t h o n 
 > > >   E O M O N T H ( D A T E ( 2 0 1 2 ,   3 ,   1 ) ,   1 0 ) 
 d a t e t i m e . d a t e ( 2 0 1 3 ,   1 ,   3 1 ) 
 ` ` ` 
 
 ` ` ` p y t h o n 
 > > >   E O M O N T H ( D A T E ( 2 0 1 2 ,   5 ,   1 ) ,   - 2 ) 
 d a t e t i m e . d a t e ( 2 0 1 2 ,   3 ,   3 1 ) 
 ` ` ` 
 
 < / d e t a i l s > 
 < d e t a i l s   i d = " h o u r " > < s u m m a r y   > 
 # # # #   H E U R E 
 < c o d e > _ _ H O U R _ _ ( t i m e ) < / c o d e > 
 < a   c l a s s = " h e a d e r l i n k "   h r e f = " # h o u r "   t i t l e = " L i e n   p e r m a n e n t " > # < / a > 
 < / s u m m a r y > 
 I d e n t i q u e   à   ` t i m e . h o u r ` . 
 
 
 ` ` ` p y t h o n 
 > > >   H O U R ( X L _ T O _ D A T E ( 0 . 7 5 ) ) 
 1 8 
 ` ` ` 
 
 ` ` ` p y t h o n 
 > > >   H O U R ( " 7 / 1 8 / 2 0 1 1   7 : 4 5 " ) 
 7 
 ` ` ` 
 
 ` ` ` p y t h o n 
 > > >   H O U R ( " 4 / 2 1 / 2 0 1 2 " ) 
 0 
 ` ` ` 
 
 < / d e t a i l s > 
 < d e t a i l s   i d = " i s o w e e k n u m " > < s u m m a r y   > 
 # # # #   I S O W E E K N U M 
 < c o d e > _ _ I S O W E E K N U M _ _ ( d a t e ) < / c o d e > 
 < a   c l a s s = " h e a d e r l i n k "   h r e f = " # i s o w e e k n u m "   t i t l e = " L i e n   p e r m a n e n t " > # < / a > 
 < / s u m m a r y > 
 R e t o u r n e   l e   n u m é r o   d e   s e m a i n e   I S O   d e   l ' a n n é e   p o u r   u n e   d a t e   d o n n é e . 
 
 
 ` ` ` p y t h o n 
 > > >   I S O W E E K N U M ( " 3 / 9 / 2 0 1 2 " ) 
 1 0 
 ` ` ` 
 
 ` ` ` p y t h o n 
 > > >   [ I S O W E E K N U M ( D A T E ( 2 0 0 0   +   y ,   1 ,   1 ) )   f o r   y   i n   [ 0 , 1 , 2 , 3 , 4 , 5 , 6 , 7 , 8 ] ] 
 [ 5 2 ,   1 ,   1 ,   1 ,   1 ,   5 3 ,   5 2 ,   1 ,   1 ] 
 ` ` ` 
 
 < / d e t a i l s > 
 < d e t a i l s   i d = " m i n u t e " > < s u m m a r y   > 
 # # # #   M I N U T E 
 < c o d e > _ _ M I N U T E _ _ ( t i m e ) < / c o d e > 
 < a   c l a s s = " h e a d e r l i n k "   h r e f = " # m i n u t e "   t i t l e = " L i e n   p e r m a n e n t " > # < / a > 
 < / s u m m a r y > 
 R e t o u r n e   l e s   m i n u t e s   d e   ` d a t e t i m e ` ,   s o u s   f o r m e   d ' e n t i e r   d e   0   à   5 9 . 
 I d e n t i q u e   à   ` t i m e . m i n u t e ` . 
 
 
 ` ` ` p y t h o n 
 > > >   M I N U T E ( X L _ T O _ D A T E ( 0 . 7 5 ) ) 
 0 
 ` ` ` 
 
 ` ` ` p y t h o n 
 > > >   M I N U T E ( " 7 / 1 8 / 2 0 1 1   7 : 4 5 " ) 
 4 5 
 ` ` ` 
 
 ` ` ` p y t h o n 
 > > >   M I N U T E ( " 1 2 : 5 9 : 0 0   P M " ) 
 5 9 
 ` ` ` 
 
 ` ` ` p y t h o n 
 > > >   M I N U T E ( d a t e t i m e . t i m e ( 1 2 ,   5 8 ,   5 9 ) ) 
 5 8 
 ` ` ` 
 
 < / d e t a i l s > 
 < d e t a i l s   i d = " m o n t h " > < s u m m a r y   > 
 # # # #   M O I S 
 < c o d e > _ _ M O N T H _ _ ( d a t e ) < / c o d e > 
 < a   c l a s s = " h e a d e r l i n k "   h r e f = " # m o n t h "   t i t l e = " L i e n   p e r m a n e n t " > # < / a > 
 < / s u m m a r y > 
 R e t o u r n e   l e   m o i s   d ' u n e   d a t e   r e p r é s e n t é e ,   s o u s   f o r m e   d ' e n t i e r   a l l a n t   d e   1   ( j a n v i e r )   à   1 2   ( d é c e m b r e ) . 
 I d e n t i q u e   à   ` d a t e . m o n t h ` . 
 
 
 ` ` ` p y t h o n 
 > > >   M O N T H ( D A T E ( 2 0 1 1 ,   4 ,   1 5 ) ) 
 4 
 ` ` ` 
 
 ` ` ` p y t h o n 
 > > >   M O N T H ( " 5 / 3 1 / 2 0 1 2 " ) 
 5 
 ` ` ` 
 
 ` ` ` p y t h o n 
 > > >   M O N T H ( d a t e t i m e . d a t e t i m e ( 1 9 0 0 ,   1 ,   1 ) ) 
 1 
 ` ` ` 
 
 < / d e t a i l s > 
 < d e t a i l s   i d = " m o o n p h a s e " > < s u m m a r y   > 
 # # # #   P H A S E   D E   L A   L U N E 
 < c o d e > _ _ M O O N P H A S E _ _ ( d a t e ,   o u t p u t = ' e m o j i ' ) < / c o d e > 
 < a   c l a s s = " h e a d e r l i n k "   h r e f = " # m o o n p h a s e "   t i t l e = " L i e n   p e r m a n e n t " > # < / a > 
 < / s u m m a r y > 
 R e t o u r n e   l a   p h a s e   d e   l a   l u n e   à   l a   d a t e   d o n n é e .   L a   s o r t i e   p a r   d é f a u t   e s t   u n   e m o j i   d e   p h a s e   d e   l u n e . 
 
 -   A v e c   ` o u t p u t = " d a y s " ` ,   l a   s o r t i e   e s t   l ' â g e   d e   l a   l u n e   e n   j o u r s   ( n o u v e l l e   l u n e   é t a n t   0 ) . 
 -   A v e c   ` o u t p u t = " f r a c t i o n " ` ,   l a   s o r t i e   e s t   l a   f r a c t i o n   d u   m o i s   l u n a i r e   d e p u i s   l a   n o u v e l l e   l u n e . 
 
 L e   c a l c u l   n ' e s t   p a s   a s t r o n o m i q u e m e n t   p r é c i s ,   m a i s   s u f f i s a n t   p o u r   l e s   l o u p s   e t   l e s   m a r i n s . 
 
 N E   P A S   !   u t i l i s e r   ` o u t p u t = " l u n a c y " ` . 
 
 
 ` ` ` p y t h o n 
 > > >   M O O N P H A S E ( d a t e t i m e . d a t e ( 1 9 0 0 ,   1 ,   1 ) ,   " d a y s " ) 
 0 . 0 
 ` ` ` 
 
 ` ` ` p y t h o n 
 > > >   M O O N P H A S E ( d a t e t i m e . d a t e ( 1 9 0 0 ,   1 ,   1 ) ,   " f r a c t i o n " ) 
 0 . 0 
 ` ` ` 
 
 ` ` ` p y t h o n 
 > > >   M O O N P H A S E ( d a t e t i m e . d a t e t i m e ( 1 9 0 0 ,   1 ,   1 ) )   = =   ' 🌑 ' 
 T r u e 
 ` ` ` 
 
 ` ` ` p y t h o n 
 > > >   M O O N P H A S E ( d a t e t i m e . d a t e ( 1 9 0 0 ,   1 ,   1 5 ) )   = =   ' 🌕 ' 
 T r u e 
 ` ` ` 
 
 ` ` ` p y t h o n 
 > > >   M O O N P H A S E ( d a t e t i m e . d a t e ( 1 9 0 0 ,   1 ,   3 0 ) )   = =   ' 🌑 ' 
 T r u e 
 ` ` ` 
 
 ` ` ` p y t h o n 
 > > >   [ M O O N P H A S E ( D A T E A D D ( d a t e t i m e . d a t e ( 2 0 2 3 ,   4 ,   1 ) ,   d a y s = 4 * n ) )   f o r   n   i n   r a n g e ( 8 ) ]   = =   [ ' 🌔 ' ,   ' 🌕 ' ,   ' 🌖 ' ,   ' 🌗 ' ,   ' 🌘 ' ,   ' 🌑 ' ,   ' 🌒 ' ,   ' 🌓 ' ] 
 T r u e 
 ` ` ` 
 
 ` ` ` p y t h o n 
 > > >   [ r o u n d ( M O O N P H A S E ( D A T E A D D ( d a t e t i m e . d a t e ( 2 0 2 3 ,   4 ,   1 ) ,   d a y s = 4 * n ) ) ,   1 )   f o r   n   i n   r a n g e ( 8 ) ] 
 [ 1 0 . 4 ,   1 4 . 4 ,   1 8 . 4 ,   2 2 . 4 ,   2 6 . 4 ,   0 . 9 ,   4 . 9 ,   8 . 9 ] 
 ` ` ` 
 
 < / d e t a i l s > 
 < d e t a i l s   i d = " n o w " > < s u m m a r y   > 
 # # # #   M A I N T E N A N T 
 < c o d e > _ _ N O W _ _ ( t z = N o n e ) < / c o d e > 
 < a   c l a s s = " h e a d e r l i n k "   h r e f = " # n o w "   t i t l e = " L i e n   p e r m a n e n t " > # < / a > 
 < / s u m m a r y > 
 R e t o u r n e   l ' o b j e t   ` d a t e t i m e `   p o u r   l ' h e u r e   a c t u e l l e . 
 < / d e t a i l s > 
 < d e t a i l s   i d = " s e c o n d " > < s u m m a r y   > 
 # # # #   S E C O N D E 
 < c o d e > _ _ S E C O N D _ _ ( t i m e ) < / c o d e > 
 < a   c l a s s = " h e a d e r l i n k "   h r e f = " # s e c o n d "   t i t l e = " L i e n   p e r m a n e n t " > # < / a > 
 < / s u m m a r y > 
 R e t o u r n e   l e s   s e c o n d e s   d e   ` d a t e t i m e ` ,   s o u s   f o r m e   d ' e n t i e r   d e   0   à   5 9 . 
 I d e n t i q u e   à   ` t i m e . s e c o n d ` . 
 
 
 ` ` ` p y t h o n 
 > > >   S E C O N D ( X L _ T O _ D A T E ( 0 . 7 5 ) ) 
 0 
 ` ` ` 
 
 ` ` ` p y t h o n 
 > > >   S E C O N D ( " 7 / 1 8 / 2 0 1 1   7 : 4 5 : 1 3 " ) 
 1 3 
 ` ` ` 
 
 ` ` ` p y t h o n 
 > > >   S E C O N D ( d a t e t i m e . t i m e ( 1 2 ,   5 8 ,   5 9 ) ) 
 5 9 
 ` ` ` 
 
 < / d e t a i l s > 
 < d e t a i l s   i d = " t o d a y " > < s u m m a r y   > 
 # # # #   A U J O U R D ' H U I 
 < c o d e > _ _ T O D A Y _ _ ( t z = N o n e ) < / c o d e > 
 < a   c l a s s = " h e a d e r l i n k "   h r e f = " # t o d a y "   t i t l e = " L i e n   p e r m a n e n t " > # < / a > 
 < / s u m m a r y > 
 R e t o u r n e   l ' o b j e t   ` d a t e `   p o u r   l a   d a t e   a c t u e l l e . 
 < / d e t a i l s > 
 < d e t a i l s   i d = " w e e k d a y " > < s u m m a r y   > 
 # # # #   J O U R   D E   L A   S E M A I N E 
 < c o d e > _ _ W E E K D A Y _ _ ( d a t e ,   r e t u r n _ t y p e = 1 ) < / c o d e > 
 < a   c l a s s = " h e a d e r l i n k "   h r e f = " # w e e k d a y "   t i t l e = " L i e n   p e r m a n e n t " > # < / a > 
 < / s u m m a r y > 
 R e t o u r n e   l e   j o u r   d e   l a   s e m a i n e   c o r r e s p o n d a n t   à   u n e   d a t e .   L e   j o u r   e s t   d o n n é   s o u s   f o r m e   d ' e n t i e r ,   a l l a n t 
 d e   1   ( d i m a n c h e )   à   7   ( s a m e d i ) ,   p a r   d é f a u t . 
 
 R e t u r n _ t y p e   d é t e r m i n e   l e   t y p e   d e   v a l e u r   r e t o u r n é e . 
 
     -   1   ( p a r   d é f a u t )   -   R e t o u r n e   1   ( d i m a n c h e )   à   7   ( s a m e d i ) . 
     -   2       -   R e t o u r n e   1   ( l u n d i )   à   7   ( d i m a n c h e ) . 
     -   3       -   R e t o u r n e   0   ( l u n d i )   à   6   ( d i m a n c h e ) . 
     -   1 1     -   R e t o u r n e   1   ( l u n d i )   à   7   ( d i m a n c h e ) . 
     -   1 2     -   R e t o u r n e   1   ( m a r d i )   à   7   ( l u n d i ) . 
     -   1 3     -   R e t o u r n e   1   ( m e r c r e d i )   à   7   ( m a r d i ) . 
     -   1 4     -   R e t o u r n e   1   ( j e u d i )   à   7   ( m e r c r e d i ) . 
     -   1 5     -   R e t o u r n e   1   ( v e n d r e d i )   à   7   ( j e u d i ) . 
     -   1 6     -   R e t o u r n e   1   ( s a m e d i )   à   7   ( v e n d r e d i ) . 
     -   1 7     -   R e t o u r n e   1   ( d i m a n c h e )   à   7   ( s a m e d i ) . 
 
 
 ` ` ` p y t h o n 
 > > >   W E E K D A Y ( D A T E ( 2 0 0 8 ,   2 ,   1 4 ) ) 
 5 
 ` ` ` 
 
 ` ` ` p y t h o n 
 > > >   W E E K D A Y ( D A T E ( 2 0 1 2 ,   3 ,   1 ) ) 
 5 
 ` ` ` 
 
 ` ` ` p y t h o n 
 > > >   W E E K D A Y ( D A T E ( 2 0 1 2 ,   3 ,   1 ) ,   1 ) 
 5 
 ` ` ` 
 
 ` ` ` p y t h o n 
 > > >   W E E K D A Y ( D A T E ( 2 0 1 2 ,   3 ,   1 ) ,   2 ) 
 4 
 ` ` ` 
 
 ` ` ` p y t h o n 
 > > >   W E E K D A Y ( " 3 / 1 / 2 0 1 2 " ,   3 ) 
 3 
 ` ` ` 
 
 < / d e t a i l s > 
 < d e t a i l s   i d = " w e e k n u m " > < s u m m a r y   > 
 # # # #   N U M É R O   D E   S E M A I N E 
 < c o d e > _ _ W E E K N U M _ _ ( d a t e ,   r e t u r n _ t y p e = 1 ) < / c o d e > 
 < a   c l a s s = " h e a d e r l i n k "   h r e f = " # w e e k n u m "   t i t l e = " L i e n   p e r m a n e n t " > # < / a > 
 < / s u m m a r y > 
 R e t o u r n e   l e   n u m é r o   d e   s e m a i n e   d ' u n e   d a t e   s p é c i f i q u e .   P a r   e x e m p l e ,   l a   s e m a i n e   c o n t e n a n t   l e   1 e r   j a n v i e r   e s t   l a 
 p r e m i è r e   s e m a i n e   d e   l ' a n n é e ,   e t   e s t   n u m é r o t é e   s e m a i n e   1 . 
 
 R e t u r n _ t y p e   d é t e r m i n e   q u e l l e   s e m a i n e   e s t   c o n s i d é r é e   c o m m e   l a   p r e m i è r e   s e m a i n e   d e   l ' a n n é e . 
 
     -   1   ( p a r   d é f a u t )   -   L a   s e m a i n e   1   e s t   l a   p r e m i è r e   s e m a i n e   c o m m e n ç a n t   d i m a n c h e   q u i   c o n t i e n t   l e   1 e r   j a n v i e r . 
     -   2       -   L a   s e m a i n e   1   e s t   l a   p r e m i è r e   s e m a i n e   c o m m e n ç a n t   l u n d i   q u i   c o n t i e n t   l e   1 e r   j a n v i e r . 
     -   1 1     -   L a   s e m a i n e   1   e s t   l a   p r e m i è r e   s e m a i n e   c o m m e n ç a n t   l u n d i   q u i   c o n t i e n t   l e   1 e r   j a n v i e r . 
     -   1 2     -   L a   s e m a i n e   1   e s t   l a   p r e m i è r e   s e m a i n e   c o m m e n ç a n t   m a r d i   q u i   c o n t i e n t   l e   1 e r   j a n v i e r . 
     -   1 3     -   L a   s e m a i n e   1   e s t   l a   p r e m i è r e   s e m a i n e   c o m m e n ç a n t   m e r c r e d i   q u i   c o n t i e n t   l e   1 e r   j a n v i e r . 
     -   1 4     -   L a   s e m a i n e   1   e s t   l a   p r e m i è r e   s e m a i n e   c o m m e n ç a n t   j e u d i   q u i   c o n t i e n t   l e   1 e r   j a n v i e r . 
     -   1 5     -   L a   s e m a i n e   1   e s t   l a   p r e m i è r e   s e m a i n e   c o m m e n ç a n t   v e n d r e d i   q u i   c o n t i e n t   l e   1 e r   j a n v i e r . 
     -   1 6     -   L a   s e m a i n e   1   e s t   l a   p r e m i è r e   s e m a i n e   c o m m e n ç a n t   s a m e d i   q u i   c o n t i e n t   l e   1 e r   j a n v i e r . 
     -   1 7     -   L a   s e m a i n e   1   e s t   l a   p r e m i è r e   s e m a i n e   c o m m e n ç a n t   d i m a n c h e   q u i   c o n t i e n t   l e   1 e r   j a n v i e r . 
     -   2 1     -   A p p r o c h e   I S O   8 6 0 1   :   L a   s e m a i n e   1   e s t   l a   p r e m i è r e   s e m a i n e   c o m m e n ç a n t   l u n d i   q u i   c o n t i e n t   l e   4   j a n v i e r . 
                 É q u i v a l e m m e n t ,   c ' e s t   l a   s e m a i n e   q u i   c o n t i e n t   l e   p r e m i e r   j e u d i   d e   l ' a n n é e . 
 
 
 ` ` ` p y t h o n 
 > > >   W E E K N U M ( D A T E ( 2 0 1 2 ,   3 ,   9 ) ) 
 1 0 
 ` ` ` 
 
 ` ` ` p y t h o n 
 > > >   W E E K N U M ( D A T E ( 2 0 1 2 ,   3 ,   9 ) ,   2 ) 
 1 1 
 ` ` ` 
 
 ` ` ` p y t h o n 
 > > >   W E E K N U M ( ' 1 / 1 / 1 9 0 0 ' ) 
 1 
 ` ` ` 
 
 ` ` ` p y t h o n 
 > > >   W E E K N U M ( ' 2 / 1 / 1 9 0 0 ' ) 
 5 
 ` ` ` 
 < / d e t a i l s > 
 < d e t a i l s   i d = " x l _ t o _ d a t e " > < s u m m a r y   > 
 # # # #   X L _ T O _ D A T E 
 < c o d e > _ _ X L _ T O _ D A T E _ _ ( v a l u e ,   t z = N o n e ) < / c o d e > 
 < a   c l a s s = " h e a d e r l i n k "   h r e f = " # x l _ t o _ d a t e "   t i t l e = " L i e n   p e r m a n e n t " > # < / a > 
 < / s u m m a r y > 
 C o n v e r t i t   u n   n u m é r o   d e   s é r i e   E x c e l   f o u r n i   r e p r é s e n t a n t   u n e   d a t e   e n   u n   o b j e t   ` d a t e t i m e ` . 
 L a   v a l e u r   e s t   i n t e r p r é t é e   c o m m e   l e   n o m b r e   d e   j o u r s   d e p u i s   l e   3 0   d é c e m b r e   1 8 9 9 . 
 
 ( C e l a   c o r r e s p o n d   à   l ' i n t e r p r é t a t i o n   d e   G o o g l e   S h e e t s .   E x c e l   c o m m e n c e   p a r   l e   3 1   d é c e m b r e   1 8 9 9   m a i s   c o n s i d è r e   à   t o r t 
 1 9 0 0   c o m m e   u n e   a n n é e   b i s s e x t i l e .   E x c e l   p o u r   M a c   d e v r a i t   ê t r e   c o n f i g u r é   p o u r   u t i l i s e r   l e   s y s t è m e   d e   d a t e   1 9 0 0 , 
 c ' e s t - à - d i r e   d é c o c h e r   l ' o p t i o n   " U t i l i s e r   l e   s y s t è m e   d e   d a t e   1 9 0 4 " . ) 
 
 L e   ` d a t e t i m e `   r e t o u r n é   a u r a   s o n   f u s e a u   h o r a i r e   d é f i n i   s u r   l ' a r g u m e n t   ` t z ` ,   o u   l e   f u s e a u   h o r a i r e   p a r   d é f a u t   d u   d o c u m e n t   l o r s q u e   ` t z `   e s t   o m i s   o u   N o n e . 
 
 
 ` ` ` p y t h o n 
 > > >   X L _ T O _ D A T E ( 4 1 1 0 0 . 1 8 7 5 ) 
 d a t e t i m e . d a t e t i m e ( 2 0 1 2 ,   7 ,   1 0 ,   4 ,   3 0 ,   t z i n f o = m o m e n t . t z i n f o ( ' A m e r i c a / N e w _ Y o r k ' ) ) 
 ` ` ` 
 
 ` ` ` p y t h o n 
 > > >   X L _ T O _ D A T E ( 3 9 4 4 8 ) 
 d a t e t i m e . d a t e t i m e ( 2 0 0 8 ,   1 ,   1 ,   0 ,   0 ,   t z i n f o = m o m e n t . t z i n f o ( ' A m e r i c a / N e w _ Y o r k ' ) ) 
 ` ` ` 
 
 ` ` ` p y t h o n 
 > > >   X L _ T O _ D A T E ( 4 0 9 8 2 . 0 6 2 5 ) 
 d a t e t i m e . d a t e t i m e ( 2 0 1 2 ,   3 ,   1 4 ,   1 ,   3 0 ,   t z i n f o = m o m e n t . t z i n f o ( ' A m e r i c a / N e w _ Y o r k ' ) ) 
 ` ` ` 
 < / d e t a i l s > 
 < d e t a i l s   i d = " y e a r " > < s u m m a r y   > 
 # # # #   A N N É E 
 < c o d e > _ _ Y E A R _ _ ( d a t e ) < / c o d e > 
 < a   c l a s s = " h e a d e r l i n k "   h r e f = " # y e a r "   t i t l e = " L i e n   p e r m a n e n t " > # < / a > 
 < / s u m m a r y > 
 R e t o u r n e   l ' a n n é e   c o r r e s p o n d a n t   à   u n e   d a t e   s o u s   f o r m e   d ' e n t i e r . 
 I d e n t i q u e   à   ` d a t e . y e a r ` . 
 
 
 ` ` ` p y t h o n 
 > > >   Y E A R ( D A T E ( 2 0 1 1 ,   4 ,   1 5 ) ) 
 2 0 1 1 
 ` ` ` 
 
 ` ` ` p y t h o n 
 > > >   Y E A R ( " 5 / 3 1 / 2 0 3 0 " ) 
 2 0 3 0 
 ` ` ` 
 
 ` ` ` p y t h o n 
 > > >   Y E A R ( d a t e t i m e . d a t e t i m e ( 1 9 0 0 ,   1 ,   1 ) ) 
 1 9 0 0 
 ` ` ` 
 
 < / d e t a i l s > 
 < d e t a i l s   i d = " y e a r f r a c " > < s u m m a r y   > 
 # # # #   Y E A R F R A C 
 < c o d e > _ _ Y E A R F R A C _ _ ( d a t e _ d é b u t ,   d a t e _ f i n ,   b a s e = 0 ) < / c o d e > 
 < a   c l a s s = " h e a d e r l i n k "   h r e f = " # y e a r f r a c "   t i t l e = " L i e n   p e r m a n e n t " > # < / a > 
 < / s u m m a r y > 
 C a l c u l e   l a   f r a c t i o n   d e   l ' a n n é e   r e p r é s e n t é e   p a r   l e   n o m b r e   d e   j o u r s   e n t i e r s   e n t r e   d e u x   d a t e s . 
 
 B a s e   e s t   l e   t y p e   d e   b a s e   d e   c o m p t a g e   d e s   j o u r s   à   u t i l i s e r . 
 
     *   ` 0 `   ( p a r   d é f a u t )   -   U S   ( N A S D )   3 0 / 3 6 0 
     *   ` 1 `       -   A c t u e l / a c t u e l 
     *   ` 2 `       -   A c t u e l / 3 6 0 
     *   ` 3 `       -   A c t u e l / 3 6 5 
     *   ` 4 `       -   E u r o p é e n   3 0 / 3 6 0 
     *   ` - 1 `     -   A c t u e l / a c t u e l   ( v a r i a t i o n   G o o g l e   S h e e t s ) 
 
 C e t t e   f o n c t i o n   e s t   u t i l e   p o u r   l e s   c a l c u l s   f i n a n c i e r s .   P o u r   l a   c o m p a t i b i l i t é   a v e c   E x c e l ,   e l l e   p a r   d é f a u t 
 u t i l i s e   l e   c a l e n d r i e r   s t a n d a r d   N A S D .   P o u r   u n e   u t i l i s a t i o n   d a n s   d e s   c o n t e x t e s   n o n   f i n a n c i e r s ,   l ' o p t i o n   ` - 1 `   e s t 
 p r o b a b l e m e n t   l e   m e i l l e u r   c h o i x . 
 
 V o i r   < h t t p s : / / f r . w i k i p e d i a . o r g / w i k i / C a l e n d r i e r _ 3 6 0 _ j o u r s >   p o u r   u n e   e x p l i c a t i o n   d e s 
 m é t h o d e s   U S   3 0 / 3 6 0   e t   E u r o p é e n n e   3 0 / 3 6 0 .   V o i r   < h t t p : / / w w w . d w h e e l e r . c o m / y e a r f r a c / >   p o u r   u n e   a n a l y s e   d e 
 l ' i m p l é m e n t a t i o n   p a r t i c u l i è r e   d ' E x c e l . 
 
 L a   b a s e   ` - 1 `   e s t   s i m i l a i r e   à   ` 1 ` ,   m a i s   d i f f è r e   d ' E x c e l   l o r s q u e   l e s   d a t e s   s ' é t e n d e n t   à   l a   f o i s   s u r   d e s   a n n é e s   b i s s e x t i l e s   e t   n o n   b i s s e x t i l e s . 
 E l l e   c o r r e s p o n d   a u   c a l c u l   d a n s   G o o g l e   S h e e t s ,   c o m p t a n t   l e s   j o u r s   d a n s   c h a q u e   a n n é e   c o m m e   u n e   f r a c t i o n 
 d e   l a   l o n g u e u r   d e   c e t t e   a n n é e . 
 
 F r a c t i o n   d e   l ' a n n é e   e n t r e   l e   1 / 1 / 2 0 1 2   e t   l e   3 0 / 7 / 1 2 ,   e n   o m e t t a n t   l ' a r g u m e n t   B a s e . 
 
 ` ` ` p y t h o n 
 > > >   " % . 8 f "   %   Y E A R F R A C ( D A T E ( 2 0 1 2 ,   1 ,   1 ) ,   D A T E ( 2 0 1 2 ,   7 ,   3 0 ) ) 
 ' 0 . 5 8 0 5 5 5 5 6 ' 
 ` ` ` 
 
 F r a c t i o n   e n t r e   l e s   m ê m e s   d a t e s ,   u t i l i s a n t   l ' a r g u m e n t   d e   b a s e   A c t u e l / A c t u e l .   P a r c e   q u e   2 0 1 2   e s t   u n e   a n n é e   b i s s e x t i l e ,   e l l e   a   u n e   b a s e   d e   3 6 6   j o u r s . 
 
 ` ` ` p y t h o n 
 > > >   " % . 8 f "   %   Y E A R F R A C ( D A T E ( 2 0 1 2 ,   1 ,   1 ) ,   D A T E ( 2 0 1 2 ,   7 ,   3 0 ) ,   1 ) 
 ' 0 . 5 7 6 5 0 2 7 3 ' 
 ` ` ` 
 
 F r a c t i o n   e n t r e   l e s   m ê m e s   d a t e s ,   u t i l i s a n t   l ' a r g u m e n t   d e   b a s e   A c t u e l / 3 6 5 .   U t i l i s e   u n e   b a s e   d e   3 6 5   j o u r s . 
 
 ` ` ` p y t h o n 
 > > >   " % . 8 f "   %   Y E A R F R A C ( D A T E ( 2 0 1 2 ,   1 ,   1 ) ,   D A T E ( 2 0 1 2 ,   7 ,   3 0 ) ,   3 ) 
 ' 0 . 5 7 8 0 8 2 1 9 ' 
 ` ` ` 
 < / d e t a i l s > 
 # # #   I n f o 
 < d e t a i l s   i d = " c e l l " > < s u m m a r y   c l a s s = " u n i m p l e m e n t e d " > 
 # # # #   C E L L U L E 
 < c o d e > _ _ C E L L _ _ ( i n f o _ t y p e ,   r é f é r e n c e ) < / c o d e > 
 < a   c l a s s = " h e a d e r l i n k "   h r e f = " # c e l l "   t i t l e = " L i e n   p e r m a n e n t " > # < / a > 
 < / s u m m a r y > 
 R e t o u r n e   l e s   i n f o r m a t i o n s   d e m a n d é e s   s u r   l a   c e l l u l e   s p é c i f i é e .   C e l a   n ' e s t   p a s   i m p l é m e n t é   d a n s   G r i s t 
 
 < s p a n   c l a s s = " g r i s t - t i p " > N o t e < / s p a n > C e t t e   f o n c t i o n   n ' e s t   a c t u e l l e m e n t   p a s   i m p l é m e n t é e   d a n s   G r i s t . 
 < / d e t a i l s > 
 < d e t a i l s   i d = " i s b l a n k " > < s u m m a r y   c l a s s = " u n i m p l e m e n t e d " > 
 # # # #   E S T V I D E 
 < c o d e > _ _ I S B L A N K _ _ ( v a l e u r ) < / c o d e > 
 < a   c l a s s = " h e a d e r l i n k "   h r e f = " # i s b l a n k "   t i t l e = " L i e n   p e r m a n e n t " > # < / a > 
 < / s u m m a r y > 
 R e t o u r n e   s i   u n e   v a l e u r   f a i t   r é f é r e n c e   à   u n e   c e l l u l e   v i d e .   E l l e   n ' e s t   p a s   i m p l é m e n t é e   d a n s   G r i s t .   P o u r   v é r i f i e r   u n e 
 c h a î n e   v i d e ,   u t i l i s e z   ` v a l e u r   = =   " " ` . 
 
 < s p a n   c l a s s = " g r i s t - t i p " > N o t e < / s p a n > C e t t e   f o n c t i o n   n ' e s t   a c t u e l l e m e n t   p a s   i m p l é m e n t é e   d a n s   G r i s t . 
 < / d e t a i l s > 
 < d e t a i l s   i d = " i s e m a i l " > < s u m m a r y   > 
 # # # #   I S E M A I L 
 < c o d e > _ _ I S E M A I L _ _ ( v a l e u r ) < / c o d e > 
 < a   c l a s s = " h e a d e r l i n k "   h r e f = " # i s e m a i l "   t i t l e = " L i e n   p e r m a n e n t " > # < / a > 
 < / s u m m a r y > 
 R e t o u r n e   s i   u n e   v a l e u r   e s t   u n e   a d r e s s e   e - m a i l   v a l i d e . 
 
 N o t e z   q u e   l a   v é r i f i c a t i o n   d e   l a   v a l i d i t é   d e s   e - m a i l s   n ' e s t   p a s   u n e   s c i e n c e   e x a c t e .   L a   n o r m e   t e c h n i q u e   c o n s i d è r e   d e   n o m b r e u s e s 
 a d r e s s e s   e - m a i l   c o m m e   v a l i d e s   q u i   n e   s o n t   p a s   u t i l i s é e s   d a n s   l a   p r a t i q u e ,   e t   n e   s e r a i e n t   p a s   c o n s i d é r é e s   c o m m e   v a l i d e s   p a r   l a   p l u p a r t 
 d e s   u t i l i s a t e u r s .   A u   l i e u   d e   c e l a ,   n o u s   s u i v o n s   l ' i m p l é m e n t a t i o n   d e   G o o g l e   S h e e t s ,   a v e c   q u e l q u e s   d i f f é r e n c e s ,   n o t é e s   c i - d e s s o u s . 
 
 
 ` ` ` p y t h o n 
 > > >   I S E M A I L ( " A b c . 1 2 3 @ e x a m p l e . c o m " ) 
 T r u e 
 ` ` ` 
 
 ` ` ` p y t h o n 
 > > >   I S E M A I L ( " B o b _ O - R e i l l y + t a g @ e x a m p l e . c o m " ) 
 T r u e 
 ` ` ` 
 
 ` ` ` p y t h o n 
 > > >   I S E M A I L ( " J o h n   D o e " ) 
 F a l s e 
 ` ` ` 
 
 ` ` ` p y t h o n 
 > > >   I S E M A I L ( " j o h n @ a o l . . . c o m " ) 
 F a l s e 
 ` ` ` 
 < / d e t a i l s > 
 < d e t a i l s   i d = " i s e r r " > < s u m m a r y   > 
 # # # #   I S E R R 
 < c o d e > _ _ I S E R R _ _ ( v a l e u r ) < / c o d e > 
 < a   c l a s s = " h e a d e r l i n k "   h r e f = " # i s e r r "   t i t l e = " L i e n   p e r m a n e n t " > # < / a > 
 < / s u m m a r y > 
 V é r i f i e   s i   u n e   v a l e u r   e s t   u n e   e r r e u r .   E n   d ' a u t r e s   t e r m e s ,   e l l e   r e t o u r n e   v r a i 
 s i   l ' u t i l i s a t i o n   d e   ` v a l e u r `   d i r e c t e m e n t   p r o v o q u e r a i t   u n e   e x c e p t i o n . 
 
 N O T E   :   G r i s t   i m p l é m e n t e   c e l a   e n   e n v e l o p p a n t   a u t o m a t i q u e m e n t   l ' a r g u m e n t   p o u r   u t i l i s e r   l ' é v a l u a t i o n   p a r e s s e u s e . 
 
 U n e   a p p r o c h e   p l u s   P y t h o n i q u e   p o u r   v é r i f i e r   l e s   e r r e u r s   e s t   : 
 ` ` ` 
 t r y : 
     . . .   v a l e u r   . . . 
 e x c e p t   E x c e p t i o n ,   e r r : 
     . . .   f a i r e   q u e l q u e   c h o s e   à   p r o p o s   d e   l ' e r r e u r   . . . 
 ` ` ` 
 
 P a r   e x e m p l e   : 
 
 ` ` ` p y t h o n 
 > > >   I S E R R ( " B o n j o u r " ) 
 F a l s e 
 ` ` ` 
 < / d e t a i l s > 
 < d e t a i l s   i d = " i s e r r o r " > < s u m m a r y   > 
 # # # #   I S E R R O R 
 < c o d e > _ _ I S E R R O R _ _ ( v a l e u r ) < / c o d e > 
 < a   c l a s s = " h e a d e r l i n k "   h r e f = " # i s e r r o r "   t i t l e = " L i e n   p e r m a n e n t " > # < / a > 
 < / s u m m a r y > 
 V é r i f i e   s i   u n e   v a l e u r   e s t   u n e   e r r e u r   o u   u n e   v a l e u r   i n v a l i d e .   E l l e   e s t   s i m i l a i r e   à   ` I S E R R ` ,   m a i s   r e t o u r n e   é g a l e m e n t   v r a i   p o u r   u n e   v a l e u r   i n v a l i d e   t e l l e   q u e   N a N   o u   u n e   v a l e u r   t e x t e   d a n s   u n e   c o l o n n e   N u m é r i q u e . 
 
 N O T E   :   G r i s t   i m p l é m e n t e   c e l a   e n   e n v e l o p p a n t   a u t o m a t i q u e m e n t   l ' a r g u m e n t   p o u r   u t i l i s e r   l ' é v a l u a t i o n   p a r e s s e u s e . 
 
 
 ` ` ` p y t h o n 
 > > >   I S E R R O R ( " B o n j o u r " ) 
 F a l s e 
 ` ` ` 
 
 ` ` ` p y t h o n 
 > > >   I S E R R O R ( A l t T e x t ( " é c h e c " ) ) 
 T r u e 
 ` ` ` 
 
 ` ` ` p y t h o n 
 > > >   I S E R R O R ( f l o a t ( ' n a n ' ) ) 
 T r u e 
 ` ` ` 
 < / d e t a i l s > 
 < d e t a i l s   i d = " i s l o g i c a l " > < s u m m a r y   > 
 # # # #   I S L O G I Q U E 
 < c o d e > _ _ I S L O G I C A L _ _ ( v a l e u r ) < / c o d e > 
 < a   c l a s s = " h e a d e r l i n k "   h r e f = " # i s l o g i c a l "   t i t l e = " L i e n   p e r m a n e n t " > # < / a > 
 < / s u m m a r y > 
 V é r i f i e   s i   u n e   v a l e u r   e s t   ` T r u e `   o u   ` F a l s e ` . 
 
 
 ` ` ` p y t h o n 
 > > >   I S L O G I C A L ( T r u e ) 
 T r u e 
 ` ` ` 
 
 ` ` ` p y t h o n 
 > > >   I S L O G I C A L ( F a l s e ) 
 T r u e 
 ` ` ` 
 
 ` ` ` p y t h o n 
 > > >   I S L O G I C A L ( 0 ) 
 F a l s e 
 ` ` ` 
 
 ` ` ` p y t h o n 
 > > >   I S L O G I C A L ( N o n e ) 
 F a l s e 
 ` ` ` 
 
 ` ` ` p y t h o n 
 > > >   I S L O G I C A L ( " T e s t " ) 
 F a l s e 
 ` ` ` 
 
 < / d e t a i l s > 
 < d e t a i l s   i d = " i s n a " > < s u m m a r y   > 
 # # # #   I S N A 
 < c o d e > _ _ I S N A _ _ ( v a l e u r ) < / c o d e > 
 < a   c l a s s = " h e a d e r l i n k "   h r e f = " # i s n a "   t i t l e = " L i e n   p e r m a n e n t " > # < / a > 
 < / s u m m a r y > 
 V é r i f i e   s i   u n e   v a l e u r   e s t   l ' e r r e u r   ` # N / A ` . 
 
 
 ` ` ` p y t h o n 
 > > >   I S N A ( f l o a t ( ' n a n ' ) ) 
 T r u e 
 ` ` ` 
 
 ` ` ` p y t h o n 
 > > >   I S N A ( 0 . 0 ) 
 F a l s e 
 ` ` ` 
 
 ` ` ` p y t h o n 
 > > >   I S N A ( ' t e x t e ' ) 
 F a l s e 
 ` ` ` 
 
 ` ` ` p y t h o n 
 > > >   I S N A ( f l o a t ( ' - i n f ' ) ) 
 F a l s e 
 ` ` ` 
 
 < / d e t a i l s > 
 < d e t a i l s   i d = " i s n o n t e x t " > < s u m m a r y   > 
 # # # #   I S N O N T E X T E 
 < c o d e > _ _ I S N O N T E X T _ _ ( v a l e u r ) < / c o d e > 
 < a   c l a s s = " h e a d e r l i n k "   h r e f = " # i s n o n t e x t "   t i t l e = " L i e n   p e r m a n e n t " > # < / a > 
 < / s u m m a r y > 
 V é r i f i e   s i   u n e   v a l e u r   e s t   n o n   t e x t u e l l e . 
 
 
 ` ` ` p y t h o n 
 > > >   I S N O N T E X T ( " a s d f " ) 
 F a l s e 
 ` ` ` 
 
 ` ` ` p y t h o n 
 > > >   I S N O N T E X T ( " " ) 
 F a l s e 
 ` ` ` 
 
 ` ` ` p y t h o n 
 > > >   I S N O N T E X T ( A l t T e x t ( " t e x t e " ) ) 
 F a l s e 
 ` ` ` 
 
 ` ` ` p y t h o n 
 > > >   I S N O N T E X T ( 1 7 . 0 ) 
 T r u e 
 ` ` ` 
 
 ` ` ` p y t h o n 
 > > >   I S N O N T E X T ( N o n e ) 
 T r u e 
 ` ` ` 
 
 ` ` ` p y t h o n 
 > > >   I S N O N T E X T ( d a t e t i m e . d a t e ( 2 0 1 1 ,   1 ,   1 ) ) 
 T r u e 
 ` ` ` 
 
 < / d e t a i l s > 
 < d e t a i l s   i d = " i s n u m b e r " > < s u m m a r y   > 
 # # # #   I S N U M É R I Q U E 
 < c o d e > _ _ I S N U M B E R _ _ ( v a l e u r ) < / c o d e > 
 < a   c l a s s = " h e a d e r l i n k "   h r e f = " # i s n u m b e r "   t i t l e = " L i e n   p e r m a n e n t " > # < / a > 
 < / s u m m a r y > 
 V é r i f i e   s i   u n e   v a l e u r   e s t   u n   n o m b r e . 
 
 
 ` ` ` p y t h o n 
 > > >   I S N U M B E R ( 1 7 ) 
 T r u e 
 ` ` ` 
 
 ` ` ` p y t h o n 
 > > >   I S N U M B E R ( - 1 2 3 . 1 2 3 4 2 3 ) 
 T r u e 
 ` ` ` 
 
 ` ` ` p y t h o n 
 > > >   I S N U M B E R ( F a l s e ) 
 T r u e 
 ` ` ` 
 
 ` ` ` p y t h o n 
 > > >   I S N U M B E R ( f l o a t ( ' n a n ' ) ) 
 T r u e 
 ` ` ` 
 
 ` ` ` p y t h o n 
 > > >   I S N U M B E R ( f l o a t ( ' i n f ' ) ) 
 T r u e 
 ` ` ` 
 
 ` ` ` p y t h o n 
 > > >   I S N U M B E R ( ' 1 7 ' ) 
 F a l s e 
 ` ` ` 
 
 ` ` ` p y t h o n 
 > > >   I S N U M B E R ( N o n e ) 
 F a l s e 
 ` ` ` 
 
 ` ` ` p y t h o n 
 > > >   I S N U M B E R ( d a t e t i m e . d a t e ( 2 0 1 1 ,   1 ,   1 ) ) 
 F a l s e 
 ` ` ` 
 
 < / d e t a i l s > 
 < d e t a i l s   i d = " i s r e f " > < s u m m a r y   > 
 # # # #   I S R E F 
 < c o d e > _ _ I S R E F _ _ ( v a l e u r ) < / c o d e > 
 < a   c l a s s = " h e a d e r l i n k "   h r e f = " # i s r e f "   t i t l e = " L i e n   p e r m a n e n t " > # < / a > 
 < / s u m m a r y > 
 V é r i f i e   s i   u n e   v a l e u r   e s t   u n   e n r e g i s t r e m e n t   d e   t a b l e . 
 
 P a r   e x e m p l e ,   s i   u n e   c o l o n n e   ` p e r s o n n e `   e s t   d e   t y p e   R é f é r e n c e   à   l a   t a b l e   ` P e r s o n n e s ` , 
 a l o r s   ` I S R E F ( $ p e r s o n n e ) `   e s t   ` T r u e ` . 
 D e   m ê m e ,   ` I S R E F ( P e r s o n n e s . l o o k u p O n e ( n a m e = $ n a m e ) ) `   e s t   ` T r u e ` .   P o u r   t o u t   a u t r e   t y p e   d e   v a l e u r , 
 ` I S R E F ( ) `   s e r a i t   é v a l u é   à   ` F a l s e ` . 
 
 
 ` ` ` p y t h o n 
 > > >   I S R E F ( 1 7 ) 
 F a l s e 
 ` ` ` 
 
 ` ` ` p y t h o n 
 > > >   I S R E F ( " R o g e r " ) 
 F a l s e 
 ` ` ` 
 
 < / d e t a i l s > 
 < d e t a i l s   i d = " i s r e f l i s t " > < s u m m a r y   > 
 # # # #   I S R E F L I S T 
 < c o d e > _ _ I S R E F L I S T _ _ ( v a l e u r ) < / c o d e > 
 < a   c l a s s = " h e a d e r l i n k "   h r e f = " # i s r e f l i s t "   t i t l e = " L i e n   p e r m a n e n t " > # < / a > 
 < / s u m m a r y > 
 V é r i f i e   s i   u n e   v a l e u r   e s t   u n   [ ` E n s e m b l e   d ' E n r e g i s t r e m e n t s ` ] ( # r e c o r d s e t ) , 
 l e   t y p e   d e   v a l e u r s   d a n s   l e s   c o l o n n e s   d e   L i s t e   d e   R é f é r e n c e s . 
 
 P a r   e x e m p l e ,   s i   u n e   c o l o n n e   ` p e r s o n n e s `   e s t   d e   t y p e   L i s t e   d e   R é f é r e n c e s   à   l a   t a b l e   ` P e r s o n n e s ` , 
 a l o r s   ` I S R E F L I S T ( $ p e r s o n n e s ) `   e s t   ` T r u e ` . 
 D e   m ê m e ,   ` I S R E F L I S T ( P e r s o n n e s . l o o k u p R e c o r d s ( n a m e = $ n a m e ) ) `   e s t   ` T r u e ` .   P o u r   t o u t   a u t r e   t y p e   d e   v a l e u r , 
 ` I S R E F L I S T ( ) `   s e r a i t   é v a l u é   à   ` F a l s e ` . 
 
 
 ` ` ` p y t h o n 
 > > >   I S R E F L I S T ( 1 7 ) 
 F a l s e 
 ` ` ` 
 
 ` ` ` p y t h o n 
 > > >   I S R E F L I S T ( " R o g e r " ) 
 F a l s e 
 ` ` ` 
 
 < / d e t a i l s > 
 < d e t a i l s   i d = " i s t e x t " > < s u m m a r y   > 
 # # # #   I S T E X T E 
 < c o d e > _ _ I S T E X T _ _ ( v a l e u r ) < / c o d e > 
 < a   c l a s s = " h e a d e r l i n k "   h r e f = " # i s t e x t "   t i t l e = " L i e n   p e r m a n e n t " > # < / a > 
 < / s u m m a r y > 
 V é r i f i e   s i   u n e   v a l e u r   e s t   d u   t e x t e . 
 
 
 ` ` ` p y t h o n 
 > > >   I S T E X T ( " a s d f " ) 
 T r u e 
 ` ` ` 
 
 ` ` ` p y t h o n 
 > > >   I S T E X T ( " " ) 
 T r u e 
 ` ` ` 
 
 ` ` ` p y t h o n 
 > > >   I S T E X T ( A l t T e x t ( " t e x t e " ) ) 
 T r u e 
 ` ` ` 
 
 ` ` ` p y t h o n 
 > > >   I S T E X T ( 1 7 . 0 ) 
 F a l s e 
 ` ` ` 
 
 ` ` ` p y t h o n 
 > > >   I S T E X T ( N o n e ) 
 F a l s e 
 ` ` ` 
 
 ` ` ` p y t h o n 
 > > >   I S T E X T ( d a t e t i m e . d a t e ( 2 0 1 1 ,   1 ,   1 ) ) 
 F a l s e 
 ` ` ` 
 
 < / d e t a i l s > 
 < d e t a i l s   i d = " i s u r l " > < s u m m a r y   > 
 # # # #   I S U R L 
 < c o d e > _ _ I S U R L _ _ ( v a l e u r ) < / c o d e > 
 < a   c l a s s = " h e a d e r l i n k "   h r e f = " # i s u r l "   t i t l e = " L i e n   p e r m a n e n t " > # < / a > 
 < / s u m m a r y > 
 V é r i f i e   s i   u n e   v a l e u r   e s t   u n e   U R L   v a l i d e .   E l l e   n ' a   p a s   b e s o i n   d ' ê t r e   e n t i è r e m e n t   q u a l i f i é e ,   n i   d ' i n c l u r e 
 " h t t p : / / "   e t   " w w w " .   E l l e   n e   s u i t   p a s   u n e   n o r m e ,   m a i s   t e n t e   d e   f o n c t i o n n e r   d e   m a n i è r e   s i m i l a i r e   à   I S U R L   d a n s 
 G o o g l e   S h e e t s ,   e t   d e   r e t o u r n e r   T r u e   p o u r   u n   t e x t e   q u i   e s t   p r o b a b l e m e n t   u n e   U R L . 
 
 L e s   p r o t o c o l e s   v a l i d e s   i n c l u e n t   f t p ,   h t t p ,   h t t p s ,   g o p h e r ,   m a i l t o ,   n e w s ,   t e l n e t   e t   a i m . 
 
 
 ` ` ` p y t h o n 
 > > >   I S U R L ( " h t t p : / / w w w . g e t g r i s t . c o m " ) 
 T r u e 
 ` ` ` 
 
 ` ` ` p y t h o n 
 > > >   I S U R L ( " h t t p s : / / f o o . c o m / t e s t _ ( w i k i p e d i a ) # c i t e - 1 " ) 
 T r u e 
 ` ` ` 
 
 ` ` ` p y t h o n 
 > > >   I S U R L ( " m a i l t o : / / u s e r @ e x a m p l e . c o m " ) 
 T r u e 
 ` ` ` 
 
 ` ` ` p y t h o n 
 > > >   I S U R L ( " h t t p : / / / a " ) 
 F a l s e 
 ` ` ` 
 
 < / d e t a i l s > 
 < d e t a i l s   i d = " n " > < s u m m a r y   > 
 # # # #   N 
 < c o d e > _ _ N _ _ ( v a l e u r ) < / c o d e > 
 < a   c l a s s = " h e a d e r l i n k "   h r e f = " # n "   t i t l e = " L i e n   p e r m a n e n t " > # < / a > 
 < / s u m m a r y > 
 R e t o u r n e   l a   v a l e u r   c o n v e r t i e   e n   u n   n o m b r e .   T r u e / F a l s e   s o n t   c o n v e r t i s   e n   1 / 0 .   U n e   d a t e   e s t   c o n v e r t i e   e n 
 n u m é r o   d e   s é r i e   d e   s t y l e   E x c e l   d e   l a   d a t e .   T o u t   l e   r e s t e   e s t   c o n v e r t i   e n   0 . 
 
 
 ` ` ` p y t h o n 
 > > >   N ( 7 ) 
 7 
 ` ` ` 
 
 ` ` ` p y t h o n 
 > > >   N ( 7 . 1 ) 
 7 . 1 
 ` ` ` 
 
 ` ` ` p y t h o n 
 > > >   N ( " P a i r " ) 
 0 
 ` ` ` 
 
 ` ` ` p y t h o n 
 > > >   N ( " 7 " ) 
 0 
 ` ` ` 
 
 ` ` ` p y t h o n 
 > > >   N ( T r u e ) 
 1 
 ` ` ` 
 
 ` ` ` p y t h o n 
 > > >   N ( d a t e t i m e . d a t e t i m e ( 2 0 1 1 ,   4 ,   1 7 ) ) 
 4 0 6 5 0 . 0 
 ` ` ` 
 
 < / d e t a i l s > 
 < d e t a i l s   i d = " n a " > < s u m m a r y   > 
 # # # #   N A 
 < c o d e > _ _ N A _ _ ( ) < / c o d e > 
 < a   c l a s s = " h e a d e r l i n k "   h r e f = " # n a "   t i t l e = " L i e n   p e r m a n e n t " > # < / a > 
 < / s u m m a r y > 
 R e t o u r n e   l ' e r r e u r   " v a l e u r   n o n   d i s p o n i b l e " ,   ` # N / A ` . 
 
 
 ` ` ` p y t h o n 
 > > >   m a t h . i s n a n ( N A ( ) ) 
 T r u e 
 ` ` ` 
 
 < / d e t a i l s > 
 < d e t a i l s
