<?php

namespace App\Tests;

use App\DataFixtures\BookFixtures;
use App\Entity\Book;
use Doctrine\ORM\EntityManager;
use Doctrine\ORM\Exception\ORMException;
use Doctrine\ORM\OptimisticLockException;
use Exception;
use Symfony\Bundle\FrameworkBundle\KernelBrowser;
use Symfony\Bundle\FrameworkBundle\Test\WebTestCase;
use Symfony\Component\HttpFoundation\Request;

class BookApiTest extends WebTestCase
{
    /** @var KernelBrowser */
    private KernelBrowser $client;

    /** @var Book */
    private Book $book;
    /**
     * This method is called before each test.
     * @throws Exception
     */
    protected function setUp(): void
    {
        $this->client = static::createClient();
        /** @var EntityManager $em */
        $em = $this->getContainer()->get('doctrine.orm.entity_manager');
        $this->book = (new Book())->fromRestfulArray(BookFixtures::$fixtures[0]);
        $this->book->setWordsAmount($this->book->getWordsAmount() + 1);
        $em->persist($this->book);
        $em->flush();
        parent::setUp();
    }

    /**
     * @throws OptimisticLockException
     * @throws ORMException
     * @throws Exception
     */
    protected function tearDown(): void
    {
        /** @var EntityManager $em */
        $em = $this->getContainer()->get('doctrine.orm.entity_manager');
        $em->remove($this->book);
        $em->flush();
        $this->ensureKernelShutdown();
        parent::tearDown();
    }

    public function testGetBooks(): void
    {
        $client = $this->client;
        $client->request(Request::METHOD_GET, '/api/restful/Book');
        $this->assertResponseIsSuccessful();
        $response = $client->getResponse();
        $this->assertTrue($response->headers->contains('Content-Type', 'application/json'));
        $this->assertJson($response->getContent());
        $responseData = json_decode($response->getContent(), true);
        $this->assertArrayHasKey('success', $responseData);
        $this->assertTrue($responseData['success']);
    }

    /**
     * @throws OptimisticLockException
     * @throws ORMException
     * @throws Exception
     */
    public function testCreateBook(): void
    {
        $client = $this->client;
        $client->request(
            Request::METHOD_POST,
            '/api/restful/Book',
            [], [],
            [
                'CONTENT_TYPE' => 'application/json',
                'HTTP_X-Requested-With' => 'XMLHttpRequest'
            ],
            json_encode(BookFixtures::$fixtures[0])
        );
        $this->assertResponseIsSuccessful();
        $response = $client->getResponse();
        $this->assertTrue($response->headers->contains('Content-Type', 'application/json'));
        $this->assertJson($response->getContent());
        $responseData = json_decode($response->getContent(), true);
        $this->assertArrayHasKey('success', $responseData);
        $this->assertTrue($responseData['success']);
        $this->assertArrayHasKey('item', $responseData);
        $bookData = $responseData['item'];
        $this->assertArrayHasKey('id', $bookData);
        $this->assertIsInt($bookData['id']);
        /** @var EntityManager $em */
        $em = $this->getContainer()->get('doctrine.orm.entity_manager');
        $book = $em->getRepository(Book::class)->find($bookData['id']);
        $em->remove($book);
        $em->flush();
    }

    /**
     * @return void
     */
    public function testReadBook(): void
    {
        $client = $this->client;
        $client->request(Request::METHOD_GET, '/api/restful/Book/' . $this->book->getId());
        $this->assertResponseIsSuccessful();
        $response = $client->getResponse();
        $this->assertTrue($response->headers->contains('Content-Type', 'application/json'));
        $this->assertJson($response->getContent());
        $responseData = json_decode($response->getContent(), true);
        $this->assertArrayHasKey('success', $responseData);
        $this->assertTrue($responseData['success']);
        $this->assertArrayHasKey('item', $responseData);
        $bookData = $responseData['item'];
        $this->assertArrayHasKey('id', $bookData);
        $this->assertIsInt($bookData['id']);
    }

    public function testUpdateBook(): void
    {
        $client = $this->client;
        $wordsCount = 1111;
        $id = $this->book->getId();
        $client->request(
            Request::METHOD_PUT,
            '/api/restful/Book/' . $id,
            [], [],
            [
                'CONTENT_TYPE' => 'application/json',
                'HTTP_X-Requested-With' => 'XMLHttpRequest'
            ],
            json_encode(['words_amount' => $wordsCount,])
        );
        $this->assertResponseIsSuccessful();
        $response = $client->getResponse();
        $this->assertTrue($response->headers->contains('Content-Type', 'application/json'));
        $this->assertJson($response->getContent());
        $responseData = json_decode($response->getContent(), true);
        $this->assertArrayHasKey('success', $responseData);
        $this->assertTrue($responseData['success']);
        $this->assertArrayHasKey('item', $responseData);
        $bookData = $responseData['item'];
        $this->assertArrayHasKey('id', $bookData);
        $this->assertIsInt($bookData['id']);
        $this->assertArrayHasKey('words_amount', $bookData);
        $this->assertIsInt($bookData['words_amount']);
        $this->assertEquals($wordsCount, $bookData['words_amount']);
    }

    /**
     * @return void
     */
    public function testDeleteBook(): void
    {
        $client = $this->client;
        $client->request(Request::METHOD_DELETE, '/api/restful/Book/' . $this->book->getId());
        $this->assertResponseIsSuccessful();
        $response = $client->getResponse();
        $this->assertTrue($response->headers->contains('Content-Type', 'application/json'));
        $this->assertJson($response->getContent());
        $responseData = json_decode($response->getContent(), true);
        $this->assertArrayHasKey('success', $responseData);
        $this->assertTrue($responseData['success']);
        $this->assertArrayHasKey('item', $responseData);
        $bookData = $responseData['item'];
        $this->assertArrayHasKey('id', $bookData);
        $this->assertIsInt($bookData['id']);
    }

}
