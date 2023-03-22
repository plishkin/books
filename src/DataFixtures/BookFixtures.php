<?php

namespace App\DataFixtures;

use App\Entity\Book;
use DateTimeImmutable;
use Doctrine\Bundle\FixturesBundle\Fixture;
use Doctrine\Persistence\ObjectManager;
use Exception;

class BookFixtures extends Fixture
{

    public static array $fixtures = [
        [
            'title' => 'Book of Life',
            'publisher' => 'Universe',
            'author' => 'God',
            'genre' => 'Meditation',
            'published_at' => 124000,
            'words_amount' => 1000000000,
            'price' => 1.01,
        ],
        [
            'title' => 'Book of Adam\'s Life',
            'publisher' => 'Humanity',
            'author' => 'Adam',
            'genre' => 'Romance',
            'published_at' => 720000,
            'words_amount' => 7000,
            'price' => 24.15,
        ],
        [
            'title' => 'Book of Eva\'s Life',
            'publisher' => 'Humanity',
            'author' => 'Eva',
            'genre' => 'Romance',
            'published_at' => 860000,
            'words_amount' => 7000000,
            'price' => 345.55,
        ],
        [
            'title' => 'Book of John\'s Life',
            'publisher' => 'Wild Wild West',
            'author' => 'John',
            'genre' => 'Western',
            'published_at' => 8600000,
            'words_amount' => 10,
            'price' => 0.55,
        ],
        [
            'title' => 'Book of Jane\'s Life',
            'publisher' => 'Wild Wild West',
            'author' => 'Jane',
            'genre' => 'Western',
            'published_at' => 8700000,
            'words_amount' => 1000,
            'price' => 3.55,
        ],
        [
            'title' => 'Book of Sam\'s Life',
            'publisher' => 'Wild Wild West',
            'author' => 'Sam',
            'genre' => 'Western',
            'published_at' => 8900000,
            'words_amount' => 100,
            'price' => 2.30,
        ],
    ];


    /**
     * @throws Exception
     */
    public function load(ObjectManager $manager): void
    {
        foreach (self::$fixtures as $fixture) {
            $book = new Book();
            $book->setTitle($fixture['title'])
                ->setPublisher($fixture['publisher'])
                ->setAuthor($fixture['author'])
                ->setGenre($fixture['genre'])
                ->setPublishedAt((new DateTimeImmutable())->setTimestamp($fixture['published_at']))
                ->setWordsAmount($fixture['words_amount'])
                ->setPrice($fixture['price'])
            ;
            $manager->persist($book);
        }
        $manager->flush();
    }
}
