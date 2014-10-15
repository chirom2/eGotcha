
<?php
        /**
         * Script permettant la selection des coordonnées GPS de la table positions
         * @autor Romain         * 
         */
        $bdd = new PDO('mysql:host=localhost;dbname=googleMaps', 'root', '');//Connexion à la base de données
        $reponse = $bdd->query('SELECT * FROM positions');
        
        $arrayPos = array();
        $myJSON = array();
        while($donnees = $reponse->fetch()){
            $arrayPos[] = array('lat' => $donnees['lat'], 'long' => $donnees['longi']);
        }
        $myJSON = array("tabOfJson" => $arrayPos, "sizeOftab" => sizeof($arrayPos));
        echo json_encode($myJSON);      
?>