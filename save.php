<?php
        /**
         * Script permettant l'insertion des coordonn�es GPS dans la table positions
         * NB: Ne regarde pas si les points sont d�j� pr�sent dans la bd avant de les ajouter
         * @autor Romain         * 
         */    
       
        $bdd = new PDO('mysql:host=localhost;dbname=googleMaps', 'root', '');//Connexion � la base de donn�es
        
        $getId = $bdd->query('SELECT MAX(id) FROM positions');//On r�cup�re l'id max
        var_dump($getId);

        $i = 0;
        $taille = sizeof($_POST['obj']);
        echo "taille ".$taille."<br/>";
        $id = ($getId->fetch());
        $idMax = $id['0'];
        echo "ID: ".$idMax."<br/>";
        
        //Ajout de chaque markers, dans la base de donn�e        
         while($i<=($taille/2)-1){//Div/2 car on recoit un tab de json de la forme ("id" : "Objet coord")
            $lat = $_POST['obj'][$i]['lat'];
            $longi = $_POST['obj'][$i]['long'];
            $idMax++;
            $requete = "INSERT INTO `googlemaps`.`positions` (`id`, `lat`, `longi`) VALUES ('".$idMax."', '".$lat."', '".$longi."')";
            echo "$requete<br/>";
            $req = $bdd->exec($requete);
            $i++;
        }
        
        
?>